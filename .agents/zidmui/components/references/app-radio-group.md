# AppRadioGroup

A radio group rendered from an `options` array, built on MUI's `RadioGroup`. Similar in purpose
to `AppInputRadio` but with a different (more flexible) `options` item shape and different
defaults — see the comparison note in `app-input-radio.md`.

## Import

```tsx
import { AppRadioGroup } from '@zidsa/zidmui/components/app-radio-group';
import type { AppRadioGroupProps } from '@zidsa/zidmui/components/app-radio-group';
```

## Props

`AppRadioGroupProps` extends MUI `RadioGroupProps` (interface `extends`), but **only a subset of
the destructured props are actually used** — the component does not spread `...props` anywhere,
so any `RadioGroupProps` field not explicitly listed below is accepted by the type but silently
has no effect at runtime.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string` | — (required) | Group name. |
| `label` | `string` | — | Rendered above the group via a styled `FormLabel` (`subtitle2` typography). |
| `options` | `Omit<FormControlLabelProps, 'control'>[]` | — (required) | Each item is a near-full `FormControlLabel` props object (minus `control`, which is fixed to a `Radio`) — more flexible than `AppInputRadio`'s simpler `{value,label,disabled?}` shape, but each item still needs at least `value` and `label` in practice. |
| `disabled` | `boolean` | `false` | Group-level disabled — overridable per-option if the option object itself sets `disabled` (option spread happens after the group default). |
| `row` | `boolean` | `true` | **Defaults to `true`** here (unlike `AppInputRadio`, which has no default). |
| `value` | `string` | — | Controlled value. |
| `onChange` | `(event: React.ChangeEvent<HTMLInputElement>) => void` | — | Narrower event type than MUI's own `RadioGroupProps['onChange']`. |
| `labelProps` | `Omit<FormControlLabelProps, 'control' \| 'label'>` | — | Applied to **every** option's `FormControlLabel`, spread **after** each `option` object — so `labelProps` values win over any matching keys set directly on an individual option. |
| `radioSize` | `'small' \| 'medium' \| 'large'` | `'medium'` | Sets `size` on each `Radio` (also passes `disableRipple`, not overridable per-option). |
| `sx` | inherited | — | Applied to the `RadioGroup`. |

**Props declared in the type but not actually applied** (no `...props` spread exists in the
component): anything else from `RadioGroupProps` beyond `name`, `onChange`, `sx`, `value`, `row`
— e.g. `defaultValue`, `id`, `ref` on the group itself will not reach the DOM through this
component.

## Usage examples

```tsx
<AppRadioGroup
  name="deliverySpeed"
  label="Delivery speed"
  options={[
    { value: 'standard', label: 'Standard' },
    { value: 'express', label: 'Express' },
  ]}
  value={deliverySpeed}
  onChange={(e) => setDeliverySpeed(e.target.value)}
/>
```

```tsx
// Column layout, small radios
<AppRadioGroup
  name="size"
  row={false}
  radioSize="small"
  options={[
    { value: 's', label: 'Small' },
    { value: 'm', label: 'Medium' },
    { value: 'l', label: 'Large' },
  ]}
/>
```

```tsx
// Per-option disabled override
<AppRadioGroup
  name="tier"
  disabled
  options={[
    { value: 'free', label: 'Free', disabled: false },
    { value: 'pro', label: 'Pro' },
  ]}
/>
```

## Composition

No sibling zidmui component imports (pure MUI internally). Do not mix this component's
`options` shape with `AppInputRadio`'s — they are not interchangeable.

## Anti-patterns

- **Passing `defaultValue`, `id`, or other unlisted `RadioGroupProps` fields and expecting them
  to work.** The component doesn't spread `...props` onto the underlying `RadioGroup` — only the
  explicitly destructured props (`name`, `onChange`, `sx`, `value`, `row`) reach MUI. Check the
  component's actual prop list above, not just the extended TypeScript interface, before relying
  on a prop.
- **Assuming `row` defaults to `false` like plain MUI `RadioGroup`.** `AppRadioGroup` defaults
  `row = true` — pass `row={false}` explicitly for a vertical layout.
- **Mixing this component's `options` (full `FormControlLabelProps`-based) with `AppInputRadio`'s
  simpler `{value,label,disabled?}` shape.** They are different types; pick one component per
  form and stay consistent.
