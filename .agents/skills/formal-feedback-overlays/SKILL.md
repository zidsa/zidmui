---
name: formal-feedback-overlays
description: Formally check the zidmui feedback-overlays group (alert, dialog, dialog with features, tooltip) by running exhaustive properties over every value of each finite prop or input domain against the real src modules, under React and MUI in Chromium, with planted mutants that must be caught. Use when changing any module of the group, or a property here, before a PR opens.
---

# Formal feedback-overlays

`props.tsx` holds the properties. `verify-zidmui/scripts/formal-run.mjs` loads it into the Storybook preview through Vite, runs each property over its whole bounded domain, and prints PASS, FINDING or FAIL per property.

```bash
.agents/skills/verify-zidmui/scripts/formal.sh feedback-overlays --mutants
```

Exit 0 means every recorded outcome holds and every mutant in `mutants/` is caught; 1 means an outcome changed or a mutant survived; 3 is a tool error. A full transcript: `~/proof/verification-coverage/zidmui/formal-all-mutants.txt`.

## Properties

- `components/app-alert`: alert: loading shows only a spinner; otherwise title, content, link, actions render iff given, the variant default is standard, and the close button exists iff onClose is set and calls it once per click
- `components/app-dialog`: dialog: in the DOM iff open; the title block renders iff title or description; actions iff given; children always; Escape and backdrop click call onClose with their reason
- `components/app-dialog-with-features`: feature dialog: loading shows only a spinner; otherwise search renders iff search or onSearchChange, typing reports each value, pagination renders iff given and reports the clicked page, children render
- `components/app-tooltip`: tooltip: hover shows headline, description and content after the 500 ms delay and never before; disable shows nothing

## Recorded findings

These are real pre-existing defects, encoded as `expect: 'violated'`. The run fails if one starts to hold, so a fix flips the record in the same PR.

- none

## Mutants

- `mutants/alert-drops-title.patch`: applied to src, run, reverted. The suite must change outcome.

## Maintain

A new module or prop value goes into its property's domain. When a property fails, read the component and the MUI or theme source before deciding whether the model or the component is wrong. Shared helpers (`mount`, `product`, `withMounted`, `click`, `settle`, `show`) are in `verify-zidmui/formal/lib.tsx`.
