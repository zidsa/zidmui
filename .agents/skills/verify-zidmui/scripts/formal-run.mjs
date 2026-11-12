#!/usr/bin/env node
// Run one formal-<group> property suite in headless Chromium through a running Storybook.
// Usage: formal-run.mjs <group> [--port 6116] [--out file.json]
// Exit 0 = every property's outcome equals its recorded outcome (FINDINGs included),
// 1 = an outcome changed, 3 = tool error (Storybook down, suite failed to load).
import { execSync } from 'node:child_process';
import { existsSync, writeFileSync } from 'node:fs';
import path from 'node:path';

import { playwright } from './pw.mjs';

const [group, ...rest] = process.argv.slice(2);
const opt = {};
for (let i = 0; i < rest.length; i += 2) opt[rest[i].replace(/^--/, '')] = rest[i + 1];
if (!group) {
  console.error('usage: formal-run.mjs <group> [--port N] [--out file.json]');
  process.exit(2);
}
const repo = execSync('git rev-parse --show-toplevel', { cwd: path.dirname(new URL(import.meta.url).pathname) }).toString().trim();
const suite = `.agents/skills/formal-${group}/props.tsx`;
if (!existsSync(path.join(repo, suite))) {
  console.error(`TOOL no suite at ${suite}`);
  process.exit(3);
}
const port = opt.port || process.env.ZIDMUI_SB_PORT || '6116';
const base = `http://127.0.0.1:${port}`;

const browser = await playwright.chromium.launch();
let code = 0;
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const consoleErrors = [];
  page.on('console', m => m.type() === 'error' && consoleErrors.push(m.text()));
  page.on('pageerror', e => consoleErrors.push(`pageerror: ${e.message}`));
  // Any story page: it brings Vite's client and the pre-bundled React/MUI the suites import.
  await page.goto(`${base}/iframe.html?id=react-app-button--primary&viewMode=story`, { waitUntil: 'load', timeout: 60000 });
  await page.waitForSelector('#storybook-root > *', { timeout: 60000 });
  const started = Date.now();
  // The first import of a dependency Vite has not pre-bundled yet (use-debounce, react-dom/client)
  // makes Vite optimise it and reload the page, which destroys the evaluation. Retry after the reload.
  let results;
  for (let attempt = 1; ; attempt++) {
    try {
      results = await page.evaluate(
        async url => {
          const mod = await import(url);
          const lib = await import('/.agents/skills/verify-zidmui/formal/lib.tsx');
          return lib.runSuite(mod.properties);
        },
        `/${suite}?t=${Date.now()}`,
      );
      break;
    } catch (e) {
      if (attempt >= 4 || !/context was destroyed|navigation/i.test(e.message)) throw e;
      await page.waitForLoadState('load');
      await page.waitForSelector('#storybook-root > *', { timeout: 60000 });
    }
  }
  const ms = Date.now() - started;
  let changed = 0;
  let cases = 0;
  for (const r of results) {
    cases += r.cases;
    const label = r.outcome === r.expected ? (r.expected === 'violated' ? 'FINDING' : 'PASS') : 'FAIL';
    if (label === 'FAIL') changed++;
    const note = r.outcome === r.expected ? '' : ` (recorded ${r.expected}, got ${r.outcome})`;
    console.log(`${label.padEnd(7)} ${r.module}: ${r.name} [${r.cases} cases]${note}`);
    if (r.error) console.log(`        error: ${r.error}`);
    if (label !== 'PASS') for (const c of r.counterexamples) console.log(`        counterexample: ${c}`);
  }
  console.log(`${group}: ${results.length} properties, ${cases} cases, ${changed} changed, ${ms} ms`);
  const relevant = consoleErrors.filter(e => !/Download the React DevTools/.test(e));
  if (relevant.length) console.log(`console errors (${relevant.length}): ${relevant.slice(0, 3).join(' | ')}`);
  if (opt.out) writeFileSync(opt.out, JSON.stringify({ group, ms, results, consoleErrors: relevant }, null, 2));
  code = changed ? 1 : 0;
} catch (e) {
  console.error(`TOOL ${e.message.split('\n')[0]}`);
  code = 3;
} finally {
  await browser.close();
}
process.exit(code);
