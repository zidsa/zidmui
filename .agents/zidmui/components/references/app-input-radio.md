# AppInputRadio

A radio group rendered from an `options` array, built on MUI's `RadioGroup`, with built-in
label/helper-text/error support. Use it for a labeled group of mutually exclusive choices. See
also `AppRadioGroup` (a similar, simpler alternative) and `AppInputRadioCard` (card-styled single
option) for related but distinct components.

## Import

```tsx
import { AppInputRadio } from '@zidsa/zidmui/components/app-input-radio';
import type { AppInputRadioProps } from '@zidsa/zidmui/components/app-input-radio';
```

## Props

`AppInputRadioProps` extends MUI `RadioGroupProps` directly (no `Omit`).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string` | — (required) | Group name — required here, unlike MUI's optional `RadioGroupProps.name`. |
| `options` | `{ value: string; label: React.ReactNode; disabled?: boolean }[]` | — (required) | Each option is rendered as a `FormControlLabel` + `Radio`. |
| `label` | `string` | — | Group label, rendered via `AppTypography` (`variant="body1"`) above the radio group. |
| `helperText` | `string` | — | Shown below the group via `FormHelperText`. |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Note: there's a known MUI console-warning issue with `fontSize="large"` referenced in a code comment — check the installed version's behavior if you use `'large'`. |
| `color` | `'primary' \| 'error'` | `'primary'` | Narrower than MUI's radio color union. |
| `labelPlacement` | `'end' \| 'start'` | `'end'` | Per-option label placement. |
| `disabled` | `boolean` | — | Disables the `FormControl` (and cascades to disable individual radios, unless overridden per-option). |
| `error` | `boolean` | — | Styles the `FormControl` and helper text as an error; also swaps in place of `helperText` if both are set — the helper text area shows `error || helperText`, so if `error` is a truthy boolean, be aware the literal value isn't shown as text (MUI's `FormHelperText` `error` prop just styles it; the *content* shown is still `helperText` unless you pass a string into `error`, which isn't the intended type). |
| `boxProps` | `BoxProps` | — | Extra props for the outer `Box`. |
| `radioProps` | `RadioProps` | — | Extra props applied to every `Radio` (per-option `disabled` from `options[].disabled` overrides this). |
| `formControlProps` | `FormControlProps` | — | Extra props for the `FormControl`. |
| `labelProps` | `AppTypographyProps` | — | Extra props for the group `label`'s typography. |
| `row` | inherited (`RadioGroupProps['row']`) | — | Lays out options horizontally when true; also affects the internal `sx.gap` (1.5 when `row`, 0 otherwise) unless you pass your own `sx`. |
| `value`, `onChange`, ... | inherited from `RadioGroupProps` | — | Pass through as-is. |

## Usage examples

```tsx
<AppInputRadio
  name="shippingMethod"
  label="Shipping method"
  options={[
    { value: 'standard', label: 'Standard (3-5 days)' },
    { value: 'express', label: 'Express (1-2 days)' },
  ]}
  value={shippingMethod}
  onChange={(e) => setShippingMethod(e.target.value)}
/>
```

```tsx
// Row layout, error state
<AppInputRadio
  name="plan"
  label="Choose a plan"
  row
  error
  helperText="Please select a plan to continue"
  options={[
    { value: 'basic', label: 'Basic' },
    { value: 'pro', label: 'Pro' },
  ]}
/>
```

```tsx
// One disabled option
<AppInputRadio
  name="tier"
  options={[
    { value: 'free', label: 'Free' },
    { value: 'enterprise', label: 'Enterprise', disabled: true },
  ]}
/>
```

## Composition

Uses `AppTypography` for the group label. Distinct from `AppRadioGroup` — both take an `options`
array and render a radio group, but `AppRadioGroup`'s options are full
`Omit<FormControlLabelProps, 'control'>` objects (more flexible per-option `FormControlLabel`
props), while `AppInputRadio`'s options are a simpler `{ value, label, disabled? }` shape. Pick
one and use it consistently — don't mix option shapes between the two components.

## Anti-patterns

- **Passing `size="large"`.** This isn't a native MUI radio size — there's a known MUI console
  warning associated with it referenced directly in the component's source comments. Verify
  visually before using it, or prefer `'medium'`.
- **Setting `error` to a string expecting it to display as the error message.** `error` is typed
  `boolean` — pass your error message via `helperText` and set `error` to `true` separately.
- **Confusing this with `AppRadioGroup`.** They look similar but have different `options` item
  shapes and different defaults (e.g. `AppRadioGroup` defaults `row = true`, `AppInputRadio` has
  no such default). Check which one is already used elsewhere in the consuming project for
  consistency.
