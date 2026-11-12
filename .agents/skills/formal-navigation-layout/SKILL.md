---
name: formal-navigation-layout
description: Formally check the zidmui navigation-layout group (list item, pagination, tabs, StackRow, StackColumn) by running exhaustive properties over every value of each finite prop or input domain against the real src modules, under React and MUI in Chromium, with planted mutants that must be caught. Use when changing any module of the group, or a property here, before a PR opens.
---

# Formal navigation-layout

`props.tsx` holds the properties. `verify-zidmui/scripts/formal-run.mjs` loads it into the Storybook preview through Vite, runs each property over its whole bounded domain, and prints PASS, FINDING or FAIL per property.

```bash
.agents/skills/verify-zidmui/scripts/formal.sh navigation-layout --mutants
```

Exit 0 means every recorded outcome holds and every mutant in `mutants/` is caught; 1 means an outcome changed or a mutant survived; 3 is a tool error. A full transcript: `~/proof/verification-coverage/zidmui/formal-all-mutants.txt`.

## Properties

- `components/app-pagination`: pagination: for every count 1..7 and page 1..count, first/previous are disabled iff page is 1, next/last iff page is count, the current page is marked, and each nav button reports the page it names
- `components/app-tabs`: tabs: exactly the tab whose value equals value is selected; clicking tab i reports value i and selects it; labels, icons and chips render in order
- `components/app-list-item`: list item: the icon, label, description, content, tooltip icon, suffix and children each render iff given, in that reading order
- `components/stack-row`: stack row: flex row, items centred, the theme gap (8px) and no child margins by default; caller props override each
- `components/stack-column`: stack column: flex column, the theme gap (8px) and no child margins by default; caller props override each

## Recorded findings

These are real pre-existing defects, encoded as `expect: 'violated'`. The run fails if one starts to hold, so a fix flips the record in the same PR.

- `components/app-list-item`: FINDING list-item-mutates-props: rendering leaves the caller's textLabelProps object unchanged, so a shared props object never carries one item's description into another

## Mutants

- `mutants/stack-row-not-centred.patch`: applied to src, run, reverted. The suite must change outcome.

## Maintain

A new module or prop value goes into its property's domain. When a property fails, read the component and the MUI or theme source before deciding whether the model or the component is wrong. Shared helpers (`mount`, `product`, `withMounted`, `click`, `settle`, `show`) are in `verify-zidmui/formal/lib.tsx`.
