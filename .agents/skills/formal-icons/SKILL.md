---
name: formal-icons
description: Formally check the zidmui icons group (all 21 icon categories (about 1,700 icon components) and their package exports) by running exhaustive properties over every value of each finite prop or input domain against the real src modules, under React and MUI in Chromium, with planted mutants that must be caught. Use when changing any module of the group, or a property here, before a PR opens.
---

# Formal icons

`props.tsx` holds the properties. `verify-zidmui/scripts/formal-run.mjs` loads it into the Storybook preview through Vite, runs each property over its whole bounded domain, and prints PASS, FINDING or FAIL per property.

```bash
.agents/skills/verify-zidmui/scripts/formal.sh icons --mutants
```

Exit 0 means every recorded outcome holds and every mutant in `mutants/` is caught; 1 means an outcome changed or a mutant survived; 3 is a tool error. A full transcript: `~/proof/verification-coverage/zidmui/formal-all-mutants.txt`.

## Properties

- `icons`: every icon file exports exactly one component, named Icon<PascalCase file name>
- `icons`: every icon renders one svg with at least one shape, over a 24x24 viewBox (currency glyphs keep their own artboard)
- `icons`: package.json exports ./icons/<category>/* for exactly the categories in src/icons, each to the built es, cjs and types paths

## Recorded findings

These are real pre-existing defects, encoded as `expect: 'violated'`. The run fails if one starts to hold, so a fix flips the record in the same PR.

- `icons`: FINDING icon-classname-drops-mui-classes: every icon keeps MuiSvgIcon-root and honours fontSize and color (createSvgIcon hoists the inner svg className over them)

## Mutants

- `mutants/arrow-box-wrong-viewbox.patch`: applied to src, run, reverted. The suite must change outcome.

## Maintain

A new module or prop value goes into its property's domain. When a property fails, read the component and the MUI or theme source before deciding whether the model or the component is wrong. Shared helpers (`mount`, `product`, `withMounted`, `click`, `settle`, `show`) are in `verify-zidmui/formal/lib.tsx`.
