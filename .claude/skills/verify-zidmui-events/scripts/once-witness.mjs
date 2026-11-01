#!/usr/bin/env node
// Runs the real src/hooks/use-custom-event-listener.ts (Node strips the types)
// against the two properties in model/CustomEvents.tla. Exit 1 if either breaks.
// Usage: once-witness.mjs [path/to/use-custom-event-listener.ts]
import { execSync } from 'node:child_process';
import path from 'node:path';

const repo = execSync('git rev-parse --show-toplevel', { cwd: path.dirname(new URL(import.meta.url).pathname) }).toString().trim();
const file = path.resolve(process.argv[2] || path.join(repo, 'src/hooks/use-custom-event-listener.ts'));

globalThis.document = new EventTarget(); // the helpers only touch document's EventTarget methods
const { on, off, once, triggerCustomEvent } = await import(file);

let failed = 0;
const check = (name, got, want, steps) => {
  const ok = got === want;
  if (!ok) failed++;
  console.log(`${ok ? 'PASS' : 'FAIL'} ${name}: expected ${want}, got ${got}\n     steps: ${steps}`);
};

// AtMostOnce: once(name, l) then three dispatches runs l one time.
{
  let runs = 0;
  once('a', () => runs++);
  triggerCustomEvent('a');
  triggerCustomEvent('a');
  triggerCustomEvent('a');
  check('AtMostOnce', runs, 1, "once('a', l); triggerCustomEvent('a') x3");
}

// OnceKeepsOn: on(name, l) keeps receiving events after a once(name, l) fired.
// on() passes the event, once's wrapper calls l() with none, so count by argument.
{
  let viaOn = 0;
  const l = e => e && viaOn++;
  on('b', l);
  once('b', l);
  triggerCustomEvent('b');
  triggerCustomEvent('b');
  triggerCustomEvent('b');
  off('b', l);
  check('OnceKeepsOn', viaOn, 3, "on('b', l); once('b', l); triggerCustomEvent('b') x3");
}

process.exit(failed ? 1 : 0);
