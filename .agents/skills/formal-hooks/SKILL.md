---
name: formal-hooks
description: Formally check the zidmui hooks group (useToggle, useDebounceState, usePaginatedData, useCustomEventListener) by running exhaustive properties over every value of each finite prop or input domain against the real src modules, under React and MUI in Chromium, with planted mutants that must be caught. Use when changing any module of the group, or a property here, before a PR opens.
---

# Formal hooks

`props.tsx` holds the properties. `verify-zidmui/scripts/formal-run.mjs` loads it into the Storybook preview through Vite, runs each property over its whole bounded domain, and prints PASS, FINDING or FAIL per property.

```bash
.agents/skills/verify-zidmui/scripts/formal.sh hooks --mutants
```

Exit 0 means every recorded outcome holds and every mutant in `mutants/` is caught; 1 means an outcome changed or a mutant survived; 3 is a tool error. A full transcript: `~/proof/verification-coverage/zidmui/formal-all-mutants.txt`.

## Properties

- `hooks/use-toggle`: after any sequence of toggle/on/off/setValue (length <= 4, default false/true/omitted) value equals the reference state machine
- `hooks/use-toggle`: setValue keeps the same identity across re-renders (safe in effect deps); preventEventDefault calls preventDefault and tolerates no event
- `hooks/use-paginated-data`: for every list length 0..23, perPage (omitted,1,3,5,10) and page 1..pagesCount+1: the page is the exact slice, pagesCount = ceil(len/limit), and the pages partition the list in order
- `hooks/use-paginated-data`: onLimitChange always returns to page 1 (falsy limit falls back to 5), and onPageChange with no page or 0 goes to page 1, so the view never points past a shrunk list
- `hooks/use-debounce-state`: the raw value follows every set at once; the debounced value stays at the last settled value during a burst and becomes the burst's last value once the delay passes
- `hooks/use-custom-event-listener`: useCustomEventListener delivers each event (with its detail) exactly once while mounted, stops at unmount, and a listener swapped on re-render replaces the old one instead of adding to it

## Recorded findings

These are real pre-existing defects, encoded as `expect: 'violated'`. The run fails if one starts to hold, so a fix flips the record in the same PR.

- none

## Mutants

- `mutants/toggle-noop.patch`: applied to src, run, reverted. The suite must change outcome.

## Maintain

A new module or prop value goes into its property's domain. When a property fails, read the component and the MUI or theme source before deciding whether the model or the component is wrong. Shared helpers (`mount`, `product`, `withMounted`, `click`, `settle`, `show`) are in `verify-zidmui/formal/lib.tsx`.
