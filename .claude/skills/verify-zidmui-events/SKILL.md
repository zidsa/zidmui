---
name: verify-zidmui-events
description: Model-check the custom-event helpers in @zidsa/zidmui (on, off, once, triggerCustomEvent in src/hooks/use-custom-event-listener.ts) with TLA+/TLC, and run the same two properties against the real TypeScript. Use when a change touches that file, when a consumer reports a once() handler firing twice or an on() handler going silent, or before changing how the helpers register or remove listeners.
---

# Verify zidmui custom events

`src/hooks/use-custom-event-listener.ts` is published as `@zidsa/zidmui/hooks/use-custom-event-listener`. Consumer apps use it to send events across the page through `document`. This skill checks two promises the helpers make:

- **AtMostOnce.** Each `once(name, l)` call runs `l` at most one time. If this breaks, a one-shot handler (a redirect, a toast, an analytics call) runs again on every later `triggerCustomEvent(name)`.
- **OnceKeepsOn.** `once(name, l)` never unsubscribes a separate `on(name, l)`. If this breaks, a handler that a component registered with `on()` (or with `useCustomEventListener`) stops getting events after an unrelated `once()` for the same function fires.

## Run it

```bash
.claude/skills/verify-zidmui-events/scripts/check.sh            # model + witness
.claude/skills/verify-zidmui-events/scripts/check.sh model      # TLC only
.claude/skills/verify-zidmui-events/scripts/check.sh witness    # real code only
```

This needs `tlc` and `sany` on `PATH` (tla2tools 1.7.4, Java 21) and Node 22.18 or later, which strips the TypeScript types. It takes about 2 seconds. Exit 0 means every line is `PASS`. Each run writes to `.verify-zidmui/formal/<UTC timestamp>/`, which is gitignored: `tlc-<Invariant>.txt` (the full TLC output and trace), `witness.txt`, and TLC's scratch files.

There are two halves:

- **Model** (`model/CustomEvents.tla`, `model/CustomEvents.cfg`). TLC explores every order of `on`, `off`, `once` and dispatch steps for 2 listeners, up to 2 `once()` calls and 3 `triggerCustomEvent()` calls. Each invariant runs separately, so one failure does not hide the other.
- **Witness** (`scripts/once-witness.mjs [file]`). This imports the real `.ts` file with `document` set to a plain `EventTarget`, then replays the two shortest counterexamples. It needs no model, so it catches a code change that the model does not reflect.

## Current result: both properties fail (open findings)

As of the sync commit below, `check.sh` exits 1 with four `FAIL` lines. This is the expected baseline, not a broken check. Do not weaken the invariants or flip `OnceRemoves` to make it pass.

The cause: `once` registers an anonymous wrapper, `() => { listener?.(); off(eventName, listener) }`, and then removes `listener`. It never removes the wrapper.

- **AtMostOnce counterexample.** `once('a', l)`, then `triggerCustomEvent('a')` three times. `l` runs 3 times. The wrapper is never removed.
- **OnceKeepsOn counterexample.** `on('b', l)`, `once('b', l)`, then `triggerCustomEvent('b')`. The wrapper runs `l` and calls `off('b', l)`, which removes the `on()` registration. Later triggers reach `l` only through the leftover wrapper, without the event argument.

Also seen, but not modeled: the wrapper calls `listener()` with no arguments, so a `once` listener never receives the `CustomEvent` or its `detail`.

The fix keeps a reference to the wrapper and removes that (`const wrapper = () => { listener?.(); off(eventName, wrapper); }; on(eventName, wrapper);`). With the fix applied and `OnceRemoves = "wrapper"` in the cfg, both halves pass (1,891 distinct states). Product code was left unchanged on purpose. Fixing it is the maintainers' call.

## Reading a result

Read every TLC result with the pstack `/statechart` skill (`/pstack:statechart` in Claude Code). On a violation, it turns the trace in `tlc-<Invariant>.txt` into the shortest path in plain words. On a pass, it draws how the helpers move between states. In the trace, `reg` is `document`'s listener list in order, `snap` is the list cloned for the dispatch in progress, `Plain(l)` is an `on()` registration and `Wrap(l, k)` is the wrapper made by the k-th `once()` call.

**A real bug or a modeling error?**

- If the model and the witness agree, trust the result.
- If the model fails but the witness passes, the model is stale or wrong. Compare each action in `CustomEvents.tla` with the code: `On` = `on`, `Off` = `off`, `Once` plus the `"wrap"` branch of `Dispatch` = `once`, and `Trigger` plus `Dispatch` = `triggerCustomEvent` → `document.dispatchEvent`.
- If the witness fails but the model passes, the code changed in a way the model does not describe, or `OnceRemoves` is set wrong. Update the model to match the code, never the reverse.
- A `TypeOK` violation or a SANY parse error is always a modeling error.

## When a change touches the covered code

Covered code: `src/hooks/use-custom-event-listener.ts`, the functions `on`, `off`, `once` and `triggerCustomEvent`. Check for changes with:

```bash
git diff 8ad3d28 -- src/hooks/use-custom-event-listener.ts
```

If that prints anything, run `check.sh`. Then:

- **`once` now removes its own wrapper** (the fix): set `OnceRemoves = "wrapper"` in `model/CustomEvents.cfg`, rerun, expect all `PASS`, and delete the "Current result" section above.
- **New behaviour** (another helper, an `AbortSignal`, passing the event into `once`'s listener): add an action that mirrors the code one call at a time, plus an invariant if it makes a new promise. Prove the invariant fails on a broken variant before trusting a pass.
- **Coverage record.** Move the sync commit (`8ad3d28` here and in the command above) forward only after you have read the new code and confirmed that every action in the model still matches it.

## Scope

- Verified: every interleaving of `on`, `off`, `once` and listener-by-listener dispatch for one event name, with 2 listeners, up to 2 `once()` calls and up to 3 triggers. A pass covers those bounds, not every sequence length.
- Assumed from the DOM: `addEventListener` ignores a duplicate (same function, same event); every `once()` call creates a new wrapper; `dispatchEvent` runs a clone of the listener list in registration order and skips a listener removed earlier in the same dispatch.
- Not covered: `useCustomEventListener` itself (React effect timing on re-render or unmount), several event names, listeners that throw, `capture` and `options` flags, and the event payload.
- Sync commit: `8ad3d28` (main, release 3.4.2). The file last changed in `5e8331d`.
