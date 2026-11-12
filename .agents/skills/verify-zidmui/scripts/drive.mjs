#!/usr/bin/env node
// Drive one Storybook story in headless Chromium and record evidence.
// Usage: drive.mjs --story <id> [--port 6116] [--args k:v;k:v] [--globals theme:dark]
//                  [--steps '<json array>' | --steps @file.json] [--out <dir>]
//        drive.mjs --flow <file.json> [--out <dir>]   (file = {story, args?, globals?, steps})
// Without --steps/--out it only checks that the story renders and writes nothing.
import { execSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

import { playwright } from './pw.mjs';

const opt = {};
const argv = process.argv.slice(2);
for (let i = 0; i < argv.length; i += 2) opt[argv[i].replace(/^--/, '')] = argv[i + 1];
if (opt.flow) {
  const flow = JSON.parse(readFileSync(opt.flow, 'utf8'));
  for (const k of ['story', 'args', 'globals']) if (flow[k] && !opt[k]) opt[k] = flow[k];
  opt.steps = JSON.stringify(flow.steps ?? []);
}
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

const loc = t => {
  const l = t.css ? page.locator(t.css) : t.role ? page.getByRole(t.role, { name: t.name, exact: true }) : t.label ? page.getByLabel(t.label, { exact: true }) : page.getByText(t.text, { exact: true });
  return t.nth === undefined ? l : l.nth(t.nth);
};
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
  hover: async t => loc(t).first().hover(),
  focus: async t => loc(t).first().focus(),
  expectChecked: async t => expectEq(`checked of ${t.name ?? t.label}`, await loc(t).isChecked(), t.value ?? true),
  expectDisabled: async t => expectEq(`disabled of ${t.name ?? t.label}`, await loc(t).isDisabled(), t.value ?? true),
  expectCount: async t => {
    const l = t.css ? page.locator(t.css) : t.role ? page.getByRole(t.role, t.name ? { name: t.name, exact: true } : {}) : page.getByText(t.text, { exact: true });
    return expectEq(`count of ${t.css ?? t.role ?? ''} ${t.name ?? t.text ?? ''}`.trim(), await l.count(), t.value);
  },
  expectGone: async t => {
    await loc(t).first().waitFor({ state: 'detached', timeout: 5000 });
    return 'gone';
  },
  expectStyle: async t => {
    const got = await loc(t).first().evaluate((el, prop) => getComputedStyle(el).getPropertyValue(prop), t.prop);
    return expectEq(`${t.prop} of ${t.name ?? t.label ?? t.text ?? t.css}`, got, t.value);
  },
  wait: async ms => page.waitForTimeout(ms),
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
// Console errors recorded as FINDINGs for this story (known-findings.tsv) do not fail a strict run;
// smoke.mjs is the one that fails when a recorded finding stops reproducing.
const findingsFile = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'known-findings.tsv');
const known = readFileSync(findingsFile, 'utf8').split('\n')
  .filter(l => l.trim() && !l.startsWith('#')).map(l => l.split('\t'))
  .filter(([id]) => id === opt.story).map(([, , match]) => match);
const unexplained = consoleErrors.filter(e => !known.some(k => e.includes(k)));
const strictFail = !failed && unexplained.length && opt["strict-console"];
if (strictFail) failed = `${unexplained.length} console errors: ${unexplained[0].slice(0, 160)}`;
console.log(failed ? `FAIL ${opt.story}: ${failed}` : `PASS ${opt.story} (${log.length} steps, ${consoleErrors.length} console errors)`);
process.exit(failed ? 1 : 0);
