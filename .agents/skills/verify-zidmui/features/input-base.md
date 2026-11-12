# Input base

`AppInputBase` is the text field: label, placeholder, helper text, start adornment text, error and disabled states, and multiline. For `type="number"` it also blocks the scroll wheel from changing the value and keeps typed digits intact under Arabic-Indic locales.

## Sub-features

- `input-type` types into a labelled field.
- `input-states` shows error, disabled, helper text and adornment.
- `input-multiline` grows into a textarea.
- `input-number-wheel` ignores the wheel on number inputs (`disableWheelNumberChange`, default `true`).
- `input-number-locale` keeps typed digits in number inputs under Arabic-Indic locales.

## How to get to it (user POV)

- Story `react-app-input-base--playground`, with args such as `--args 'label:Amount;helperText:Required;error:!true'`.
- Story `react-app-input-base--variants`: every variant on one page, with labels like `User name`.
- Story `react-app-input-base-search--playground` for the search variant.

## Driving it with drive.mjs

Preconditions:

- `sb.sh doctor` is all `ok`.

- **Type.** `drive --story react-app-input-base--playground --args 'label:Amount' --steps '[{"type":{"label":"Amount","value":"12"}},{"expectValue":{"label":"Amount","value":"12"}},{"aria":"typed"}]'`. The snapshot shows `textbox "Amount"` with text `12`.
- **Disabled.** Add `disabled:!true` to `--args`; a `type` step then fails with a disabled-element timeout, which is the expected result. Assert it with `{"expectAttr":{"label":"Amount","attr":"disabled","value":""}}` instead.
- **Number guards.** Unreachable from stories today; see Gotchas.

## Gotchas

- Boolean args in the URL use `!true` / `!false` (`error:!true`), not `true`.
- `type` has no `argTypes` entry, so `--args 'type:number'` is silently dropped and the field stays a text input. No story renders `AppInputBase` with `type="number"` (the number inputs in `src/stories/css/Input.stories.tsx` are plain CSS, not this component). `input-number-wheel` and `input-number-locale` are therefore unreachable: report them as such, and add a story before claiming them.
- The wheel guard is attached only when the caller passes `slotProps.htmlInput` (`app-input-base.tsx` sets `slotProps.htmlInput.onWheel` and does nothing otherwise). A story for `input-number-wheel` must cover both cases. Without `htmlInput`, expect the wheel to change the value even though `disableWheelNumberChange` defaults to `true`. That is an open finding, not a recipe error.
- `input-number-locale` also needs a browser locale that renders Arabic-Indic digits (Chromium `--lang=ar` / `locale: 'ar-SA'`); `drive.mjs` does not set one.
