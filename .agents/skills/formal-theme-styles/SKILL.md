---
name: formal-theme-styles
description: Formally check the zidmui theme-styles group (the MUI light/dark themes (src/theme) and the CSS design tokens (src/css)) by running exhaustive properties over every value of each finite prop or input domain against the real src modules, under React and MUI in Chromium, with planted mutants that must be caught. Use when changing any module of the group, or a property here, before a PR opens.
---

# Formal theme-styles

`props.tsx` holds the properties. `verify-zidmui/scripts/formal-run.mjs` loads it into the Storybook preview through Vite, runs each property over its whole bounded domain, and prints PASS, FINDING or FAIL per property.

```bash
.agents/skills/verify-zidmui/scripts/formal.sh theme-styles --mutants
```

Exit 0 means every recorded outcome holds and every mutant in `mutants/` is caught; 1 means an outcome changed or a mutant survived; 3 is a tool error. A full transcript: `~/proof/verification-coverage/zidmui/formal-all-mutants.txt`.

## Properties

- `theme`: the light and dark source palettes define the same token paths, so no palette lookup is undefined in one mode
- `theme`: both themes carry 25 shadows (MUI elevations 0..24), the same shape and the same typography
- `styles`: every var(--zid-*) used in any stylesheet is declared somewhere in src/css
- `styles`: the dark theme only overrides tokens :root declares, so light mode never falls back for a dark-only token
- `styles`: index.css imports every stylesheet in src/css exactly once, tokens before utilities before components
- `styles`: the CSS primary and text tokens resolve to the MUI palette colours in both modes

## Recorded findings

These are real pre-existing defects, encoded as `expect: 'violated'`. The run fails if one starts to hold, so a fix flips the record in the same PR.

- `styles`: FINDING css-dark-secondary-drift: the CSS secondary tokens resolve to the MUI palette secondary colours in both modes (the dark override repeats the light values)

## Mutants

- `mutants/dark-palette-drops-token.patch`: applied to src, run, reverted. The suite must change outcome.

## Maintain

A new module or prop value goes into its property's domain. When a property fails, read the component and the MUI or theme source before deciding whether the model or the component is wrong. Shared helpers (`mount`, `product`, `withMounted`, `click`, `settle`, `show`) are in `verify-zidmui/formal/lib.tsx`.
