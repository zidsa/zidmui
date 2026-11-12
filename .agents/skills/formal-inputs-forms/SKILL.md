---
name: formal-inputs-forms
description: Formally check the zidmui inputs-forms group (buttons, icon button, checkbox, input base, search input, adornment text, radio, radio card, radio group, switch, switch group) by running exhaustive properties over every value of each finite prop or input domain against the real src modules, under React and MUI in Chromium, with planted mutants that must be caught. Use when changing any module of the group, or a property here, before a PR opens.
---

# Formal inputs-forms

`props.tsx` holds the properties. `verify-zidmui/scripts/formal-run.mjs` loads it into the Storybook preview through Vite, runs each property over its whole bounded domain, and prints PASS, FINDING or FAIL per property.

```bash
.agents/skills/verify-zidmui/scripts/formal.sh inputs-forms --mutants
```

Exit 0 means every recorded outcome holds and every mutant in `mutants/` is caught; 1 means an outcome changed or a mutant survived; 3 is a tool error. A full transcript: `~/proof/verification-coverage/zidmui/formal-all-mutants.txt`.

## Properties

- `components/app-button`: button: colour resolves to the given colour, else secondary for outlined/text and primary for contained (the default variant); children then content render; a tooltip shows on hover iff given; disabled blocks onClick
- `components/app-icon-button`: icon button: defaults to colour secondary and size small, hideBorder removes the border, a tooltip shows on hover iff given
- `components/app-checkbox`: checkbox: checked mirrors the prop; a click calls onChange with the flipped value unless disabled; the label renders
- `components/app-input-base`: input: the field shows transformText(typed) and onChange sees the transformed value, for every transform and input (Arabic-Indic digits included)
- `components/app-input-base`: input: the label suffix renders after the label, adornment elements win over adornment text, and both positions are independent
- `components/app-input-base-search`: search input: the input id is input-<name>, the search icon is the start adornment, and typing reports the value
- `components/app-input-adornment-text`: adornment text: position defaults to start, the text renders, hideBackground makes the background transparent
- `components/app-input-radio`: radio input: one radio per option; a radio is disabled iff the group or its option is; clicking an enabled unchecked option reports its value
- `components/app-input-radio-card`: radio card: a string label renders with its suffix, the description and icon render iff given, the spinner iff loading, and a click checks it
- `components/app-radio-group`: radio group: the legend renders iff a label is given, the checked radio is the one whose value equals value, disabled disables every option, and a click reports the value
- `components/app-switch`: switch: a label wraps it in a form label, no label renders the bare switch; name and colour (default primary) reach the input, and a click flips it
- `components/app-switch-group`: switch group: one switch per option in order, the legend iff label, disabled disables every switch, required reaches every input

## Recorded findings

These are real pre-existing defects, encoded as `expect: 'violated'`. The run fails if one starts to hold, so a fix flips the record in the same PR.

- `components/app-input-base`: FINDING number-wheel-guard: with disableWheelNumberChange (default true) a wheel over a focused number input blurs it, whether or not the caller passes slotProps.htmlInput
- `components/app-input-radio`: FINDING radio-error-hides-helper: with error set, the helper text still renders (in the error colour)
- `components/app-switch-group`: FINDING switch-group-error-hides-helper: with error set, the helper text still renders (in the error colour)

## Mutants

- `mutants/checkbox-not-disabled.patch`: applied to src, run, reverted. The suite must change outcome.

## Maintain

A new module or prop value goes into its property's domain. When a property fails, read the component and the MUI or theme source before deciding whether the model or the component is wrong. Shared helpers (`mount`, `product`, `withMounted`, `click`, `settle`, `show`) are in `verify-zidmui/formal/lib.tsx`.
