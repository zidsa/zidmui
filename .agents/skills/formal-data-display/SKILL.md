---
name: formal-data-display
description: Formally check the zidmui data-display group (accordion, card, empty state, icon box, icon with tooltip, overflown text, status chip, typography) by running exhaustive properties over every value of each finite prop or input domain against the real src modules, under React and MUI in Chromium, with planted mutants that must be caught. Use when changing any module of the group, or a property here, before a PR opens.
---

# Formal data-display

`props.tsx` holds the properties. `verify-zidmui/scripts/formal-run.mjs` loads it into the Storybook preview through Vite, runs each property over its whole bounded domain, and prints PASS, FINDING or FAIL per property.

```bash
.agents/skills/verify-zidmui/scripts/formal.sh data-display --mutants
```

Exit 0 means every recorded outcome holds and every mutant in `mutants/` is caught; 1 means an outcome changed or a mutant survived; 3 is a tool error. A full transcript: `~/proof/verification-coverage/zidmui/formal-all-mutants.txt`.

## Properties

- `components/app-accordion`: controlled accordion: aria-expanded equals isOpen, the summary button is disabled iff disable, the children are in the DOM iff (open or unmountOnExit=false) and details are not loading, and the expand icon is hidden iff the summary loads
- `components/app-accordion`: uncontrolled accordion: clicking the summary flips aria-expanded and calls onToggle with the new state, unless disabled
- `components/app-card`: card actions render iff at least one non-null action is given and the card is not loading; title and description render iff given
- `components/app-empty-state`: empty state: title is h4 at size standard and h6 at size small, an icon gets the error colour only for variant error, an image wins over an icon, and each text renders iff given
- `components/app-icon-box`: icon box: size large/medium/small renders 48/40/24 px square (default large), and every background differs from the default background except default itself
- `components/app-icon-with-tooltip`: icon with tooltip renders nothing without a tooltip, and with one shows exactly that text on hover
- `components/app-overflown-text-with-tooltip`: overflown text shows its full title as a tooltip on hover iff the text is clipped (one line or two lines)
- `components/app-status`: status chip: default colour neutral and size small, the chip text is the label, and a tooltip wraps it iff given
- `components/app-typography`: typography: default variant body1, any variant maps to its MUI class, and the tooltip shows on hover iff given

## Recorded findings

These are real pre-existing defects, encoded as `expect: 'violated'`. The run fails if one starts to hold, so a fix flips the record in the same PR.

- none

## Mutants

- `mutants/accordion-ignores-disable.patch`: applied to src, run, reverted. The suite must change outcome.

## Maintain

A new module or prop value goes into its property's domain. When a property fails, read the component and the MUI or theme source before deciding whether the model or the component is wrong. Shared helpers (`mount`, `product`, `withMounted`, `click`, `settle`, `show`) are in `verify-zidmui/formal/lib.tsx`.
