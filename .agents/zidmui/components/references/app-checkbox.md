# AppCheckbox

A labeled checkbox wrapping MUI's `Checkbox` + `FormControlLabel`. Use it for any standalone
boolean input with a visible label.

## Import

```tsx
import { AppCheckbox } from '@zidsa/zidmui/components/app-checkbox';
import type { AppCheckboxProps } from '@zidsa/zidmui/components/app-checkbox';
```

## Props

`AppCheckboxProps` is a standalone interface (not an `Omit<CheckboxProps, ...>` at the top
level) — it exposes MUI's checkbox/label props indirectly through `checkboxProps`/`labelProps`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string \| React.ReactNode` | `''` | Rendered as the `FormControlLabel`'s label. |
| `labelProps` | `Omit<FormControlLabelProps, 'control' \| 'label'>` | — | Extra props for the `FormControlLabel` (e.g. `sx`, `labelPlacement`). |
| `name` | `string` | `''` | Passed to the underlying `Checkbox`. |
| `checked` | `boolean` | — (undefined = uncontrolled) | Controlled checked state. |
| `disabled` | `boolean` | `false` | Disables both the label and the checkbox. |
| `onChange` | `CheckboxProps['onChange']` | no-op `() => {}` | Change handler — note the default is a no-op, not `undefined`, so an unchecked `AppCheckbox` with no `onChange` will not warn about being a controlled input with no handler, but it also won't update anything. |
| `checkboxProps` | `Omit<CheckboxProps, 'checked' \| 'onChange' \| 'name' \| 'disabled'>` | — | Extra `Checkbox` props not already covered by the top-level props above (those four keys are excluded since they're set directly). |

## Usage examples

```tsx
// Uncontrolled
<AppCheckbox name="acceptTerms" label="I accept the terms and conditions" />
```

```tsx
// Controlled
const [checked, setChecked] = useState(false);

<AppCheckbox
  name="subscribe"
  label="Subscribe to updates"
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>
```

```tsx
// Disabled
<AppCheckbox name="locked" label="Locked option" disabled checked />
```

## Composition

No sibling zidmui components — pairs naturally with `AppTypography`/`AppInputRadio` in forms
built from other zidmui inputs, but has no internal dependency on them.

## Anti-patterns

- **Relying on the default no-op `onChange` for a controlled checkbox.** If you pass `checked`
  without `onChange`, the checkbox will visually appear controlled but clicking it will do
  nothing (the no-op default swallows the event) — always pair `checked` with a real `onChange`.
- **Trying to set `checked`/`onChange`/`name`/`disabled` via `checkboxProps`.** These four keys
  are explicitly omitted from `checkboxProps`'s type — set them via the top-level props instead.
- **Passing `control` or `label` inside `labelProps`.** Both are omitted from `labelProps`'s
  type since they're fixed internally (`control` is always the `Checkbox`, `label` is the
  top-level `label` prop) — passing them will be a type error.
