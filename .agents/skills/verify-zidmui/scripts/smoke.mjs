#!/usr/bin/env node
// Render every story whose id starts with one of the given prefixes, in one headless Chromium,
// in the light and the dark theme, and fail on a story that does not render, an empty root,
// or a console error. Usage: smoke.mjs <out-dir> <id-prefix|story-id>... [--port N]
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

import { playwright } from './pw.mjs';
const args = process.argv.slice(2);
const pi = args.indexOf('--port');
const port = pi >= 0 ? args.splice(pi, 2)[1] : process.env.ZIDMUI_SB_PORT || '6116';
const [out, ...prefixes] = args;
if (!out || !prefixes.length) {
  console.error('usage: smoke.mjs <out-dir> <id-prefix>... [--port N]');
  process.exit(2);
}
mkdirSync(out, { recursive: true });
const base = `http://127.0.0.1:${port}`;
const index = await (await fetch(`${base}/index.json`)).json();
const ids = Object.values(index.entries)
  .filter(e => e.type === 'story' && prefixes.some(p => e.id === p || e.id.startsWith(`${p}--`)))
  .map(e => e.id)
  .sort();
if (!ids.length) {
  console.error(`TOOL no stories match ${prefixes.join(' ')}`);
  process.exit(3);
}
const browser = await playwright.chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
const findingsFile = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'known-findings.tsv');
const findings = existsSync(findingsFile)
  ? readFileSync(findingsFile, 'utf8').split('\n').filter(l => l.trim() && !l.startsWith('#')).map(l => {
      const [id, name, match] = l.split('\t');
      return { id, name, match, seen: false };
    }).filter(f => ids.includes(f.id))
  : [];
let errors = [];
page.on('console', m => m.type() === 'error' && errors.push(m.text()));
page.on('pageerror', e => errors.push(`pageerror: ${e.message}`));
const results = [];
for (const theme of ['light', 'dark']) {
  for (const id of ids) {
    errors = [];
    const url = `${base}/iframe.html?id=${id}&viewMode=story&globals=theme:${theme}`;
    let error = null;
    try {
      await page.goto(url, { waitUntil: 'load', timeout: 60000 });
      await page.waitForFunction(() => /sb-show-(main|errordisplay|nopreview)/.test(document.body.className), null, { timeout: 60000 });
      const cls = await page.evaluate(() => document.body.className);
      if (!cls.includes('sb-show-main')) throw new Error(`did not render (${cls})`);
      // sb-show-main lands before React commits the story, so wait for the root to fill.
      const html = await page
        .waitForFunction(() => (document.getElementById('storybook-root')?.innerHTML.length ?? 0) >= 20, null, { timeout: 10000 })
        .then(() => 20, () => page.evaluate(() => document.getElementById('storybook-root')?.innerHTML.length ?? 0));
      if (html < 20) throw new Error(`empty root (${html} chars)`);
      await page.waitForTimeout(150);
      if (theme === 'light') await page.screenshot({ path: path.join(out, `${id}.png`), fullPage: true });
      else await page.screenshot({ path: path.join(out, `${id}.dark.png`) });
    } catch (e) {
      error = e.message.split('\n')[0];
    }
    const consoleErrors = errors.filter(e => !/Download the React DevTools/.test(e));
    // A recorded FINDING (known-findings.tsv) passes only while it still reproduces, and only
    // when every console error of the story matches it; anything new still fails.
    const known = findings.filter(f => f.id === id);
    const unexplained = consoleErrors.filter(e => !known.some(f => e.includes(f.match)));
    for (const f of known) if (consoleErrors.some(e => e.includes(f.match))) f.seen = true;
    const ok = !error && !unexplained.length;
    const tag = !ok ? 'FAIL' : consoleErrors.length ? 'FINDING' : 'PASS';
    results.push({ id, theme, ok, finding: tag === 'FINDING', error, consoleErrors });
    console.log(`${tag} ${theme.padEnd(5)} ${id}${error ? `: ${error}` : ''}${unexplained.length ? ` console: ${unexplained[0].slice(0, 200)}` : tag === 'FINDING' ? ` (${[...new Set(known.map(f => f.name))].join(', ')})` : ''}`);
  }
}
await browser.close();
writeFileSync(path.join(out, 'smoke.json'), JSON.stringify(results, null, 2));
for (const f of findings) {
  if (f.seen) continue;
  console.log(`FAIL FINDING GONE ${f.id} ${f.name}: no longer reproduces; drop it from known-findings.tsv`);
  results.push({ id: f.id, ok: false, error: `finding ${f.name} gone` });
}
const bad = results.filter(r => !r.ok).length;
console.log(`smoke: ${ids.length} stories x 2 themes, ${bad} failed`);
process.exit(bad ? 1 : 0);
