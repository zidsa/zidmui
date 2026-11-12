#!/usr/bin/env node
// Drive one Storybook story in headless Chromium and record evidence.
// Usage: drive.mjs --story <id> [--port 6116] [--args k:v;k:v] [--globals theme:dark]
//                  [--steps '<json array>' | --steps @file.json] [--out <dir>]
// Without --steps/--out it only checks that the story renders and writes nothing.
import { execSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';

const require = createRequire(import.meta.url);
let playwright;
try {
  playwright = require('playwright');
} catch {
  // Playwright is not a repo dependency; use the machine-wide install.
  playwright = require(path.join(execSync('npm root -g').toString().trim(), 'playwright'));
}

const opt = {};
const argv = process.argv.slice(2);
for (let i = 0; i < argv.length; i += 2) opt[argv[i].replace(/^--/, '')] = argv[i + 1];
if (!opt.story) {
  console.error('usage: drive.mjs --story <id> [--port N] [--args k:v] [--globals k:v] [--steps json|@file] [--out dir]');
  process.exit(2);
}
const port = opt.port || process.env.ZIDMUI_SB_PORT || '6116';
const steps = opt.steps ? JSON.parse(opt.steps.startsWith('@') ? readFileSync(opt.steps.slice(1), 'utf8') : opt.steps) : [];
const record = Boolean(opt.steps || opt.out);
const repo = execSync('git rev-parse --show-toplevel', { cwd: path.dirname(new URL(import.meta.url).pathname) }).toString().trim();
const runId = `${new Date().toISOString().replace(/[:.]/g, '-')}-${opt.story}`;
const out = opt.out || path.join(repo, '.verify-zidmui', 'evidence', runId);

const params = new URLSearchParams({ id: opt.story, viewMode: 'story' });
if (opt.args) params.set('args', opt.args);
if (opt.globals) params.set('globals', opt.globals);
const url = `http://127.0.0.1:${port}/iframe.html?${params}`;

const log = [];
const consoleErrors = [];
const browser = await playwright.chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
page.on('console', m => m.type() === 'error' && consoleErrors.push(m.text()));
page.on('pageerror', e => consoleErrors.push(`pageerror: ${e.message}`));

const loc = t =>
  t.role ? page.getByRole(t.role, { name: t.name, exact: true }) : t.label ? page.getByLabel(t.label, { exact: true }) : page.getByText(t.text, { exact: true });
const shot = async name => record && page.screenshot({ path: path.join(out, `${String(log.length).padStart(2, '0')}-${name}.png`), fullPage: true });
const expectEq = (what, got, want) => {
  if (got !== want) throw new Error(`${what}: expected ${JSON.stringify(want)}, got ${JSON.stringify(got)}`);
  return got;
};

const ops = {
  click: async t => loc(t).click(),
  type: async t => loc(t).pressSequentially(String(t.value)),
  fill: async t => loc(t).fill(String(t.value)),
  press: async key => page.keyboard.press(key),
  wheel: async t => {
    await loc(t).focus();
    await loc(t).hover();
    await page.mouse.wheel(0, t.deltaY ?? -100);
    await page.waitForTimeout(200);
  },
  expect: async t => {
    await loc(t).first().waitFor({ state: t.state || 'visible', timeout: 5000 });
    return t.state || 'visible';
  },
  expectAttr: async t => expectEq(`${t.attr} of ${t.name ?? t.label}`, await loc(t).getAttribute(t.attr), t.value),
  expectValue: async t => expectEq(`value of ${t.label ?? t.name}`, await loc(t).inputValue(), String(t.value)),
  expectHtmlAttr: async t => {
    await page.waitForFunction(([a, v]) => document.documentElement.getAttribute(a) === v, [t.attr, t.value], { timeout: 5000 });
    return t.value;
  },
  shot: async name => shot(name),
  aria: async name => {
    const snap = await page.locator('body').ariaSnapshot();
    if (record) writeFileSync(path.join(out, `${String(log.length).padStart(2, '0')}-${name}.aria.yml`), snap);
    return `${snap.split('\n').length} lines`;
  },
};

let failed = null;
try {
  if (record) mkdirSync(out, { recursive: true });
  await page.goto(url, { waitUntil: 'load', timeout: 120000 });
  // Storybook marks <body> once the story has rendered or failed.
  await page.waitForFunction(() => /sb-show-(main|errordisplay|nopreview)/.test(document.body.className), null, { timeout: 120000 });
  const bodyClass = await page.evaluate(() => document.body.className);
  if (!bodyClass.includes('sb-show-main')) throw new Error(`story did not render (body class: ${bodyClass})`);
  await shot('initial');
  for (const step of steps) {
    const [op, arg] = Object.entries(step)[0];
    if (!ops[op]) throw new Error(`unknown step "${op}"; known: ${Object.keys(ops).join(', ')}`);
    const entry = { at: new Date().toISOString(), op, arg };
    log.push(entry);
    try {
      entry.result = (await ops[op](arg)) ?? 'ok';
    } catch (e) {
      entry.error = e.message.split('\n')[0];
      throw e;
    }
  }
  await shot('final');
} catch (e) {
  failed = e.message.split('\n')[0];
  await shot('failure').catch(() => {});
} finally {
  await browser.close();
}

const summary = { url, story: opt.story, ok: !failed, error: failed, steps: log, consoleErrors };
if (record) {
  writeFileSync(path.join(out, 'transcript.json'), JSON.stringify(summary, null, 2));
  console.log(`evidence: ${out}`);
}
console.log(failed ? `FAIL ${opt.story}: ${failed}` : `PASS ${opt.story} (${log.length} steps, ${consoleErrors.length} console errors)`);
process.exit(failed ? 1 : 0);
