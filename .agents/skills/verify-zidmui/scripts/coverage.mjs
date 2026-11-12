#!/usr/bin/env node
// Coverage check: every Storybook story belongs to a feature group, and every group prefix is live.
// Reads the running Storybook's index.json and every .agents/skills/verify-<group>/stories.txt.
// Usage: coverage.mjs [--port N]. Exit 0 = covered, 1 = an uncovered story or a dead prefix, 3 = tool error.
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const pi = args.indexOf('--port');
const port = pi >= 0 ? args[pi + 1] : process.env.ZIDMUI_SB_PORT || '6116';
const skills = path.join(path.dirname(new URL(import.meta.url).pathname), '..', '..');
const groups = readdirSync(skills).filter(d => d.startsWith('verify-') && d !== 'verify-zidmui' && d !== 'verify-zidmui-events');
const prefixes = groups.flatMap(g =>
  readFileSync(path.join(skills, g, 'stories.txt'), 'utf8').split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('#')).map(p => ({ g, p })),
);
let index;
try {
  index = await (await fetch(`http://127.0.0.1:${port}/index.json`)).json();
} catch (e) {
  console.log(`TOOL coverage: cannot read index.json on port ${port}: ${e.message}`);
  process.exit(3);
}
const ids = Object.values(index.entries).filter(e => e.type === 'story').map(e => e.id);
const hit = (id, p) => id === p || id.startsWith(`${p}--`);
const uncovered = ids.filter(id => !prefixes.some(({ p }) => hit(id, p)));
const dead = prefixes.filter(({ p }) => !ids.some(id => hit(id, p)));
for (const id of uncovered) console.log(`FAIL coverage: story ${id} matches no group prefix; add its prefix to one verify-<group>/stories.txt`);
for (const { g, p } of dead) console.log(`FAIL coverage: prefix ${p} in ${g}/stories.txt matches no story; remove or fix it`);
console.log(`coverage: ${ids.length} stories, ${prefixes.length} prefixes in ${groups.length} groups, ${uncovered.length} uncovered, ${dead.length} dead`);
process.exit(uncovered.length || dead.length ? 1 : 0);
