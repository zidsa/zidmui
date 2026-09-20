# AppInputBase

The base text field wrapper, built on MUI's `TextField`, adding text adornment helpers, a text
transform hook, and number-input wheel-scroll safety. Use it for any single-line/multi-line text
input instead of MUI's `TextField` directly.

## Import

```tsx
import { AppInputBase } from '@zidsa/zidmui/components/app-input-base';
import type { AppInputBaseProps } from '@zidsa/zidmui/components/app-input-base';
```

## Props

`AppInputBaseProps` = `Omit<TextFieldProps, 'variant'> & { transformText?, startAdornment?, startAdornmentText?, startAdornmentTextProps?, endAdornment?, endAdornmentText?, endAdornmentTextProps?, labelSuffix?, disableWheelNumberChange? }`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | — | — | **Omitted.** Cannot be set — the field always uses MUI's default text field variant. |
| `transformText` | `(text: string) => string` | — | Runs on every keystroke, transforming `event.target.value` before your own `onChange` sees it (e.g. force uppercase, strip characters). |
| `startAdornment` | `React.JSX.Element` | — | A raw element (icon, custom node), wrapped in MUI's `InputAdornment` automatically. Takes priority over `startAdornmentText`. |
| `startAdornmentText` | `React.JSX.Element \| string` | — | Rendered via `AppInputAdornmentText` (themed text pill) — use this instead of `startAdornment` for plain text prefixes like currency symbols or units. |
| `startAdornmentTextProps` | `AppInputAdornmentTextProps` | — | Extra props for the start text adornment (e.g. `hideBackground`). |
| `endAdornment` | `React.JSX.Element` | — | Same as `startAdornment`, for the end side. |
| `endAdornmentText` | `React.JSX.Element \| string` | — | Same as `startAdornmentText`, for the end side. |
| `endAdornmentTextProps` | `AppInputAdornmentTextProps` | — | Same as `startAdornmentTextProps`, for the end side. |
| `labelSuffix` | `ReactNode` | — | Rendered inline right after `label` (only if `label` is also set). |
| `disableWheelNumberChange` | `boolean` | `true` | When `type="number"`, blurs the input on mouse wheel to prevent accidental value changes while scrolling the page. Set to `false` to restore native scroll-to-change behavior. |
| `size` | inherited | `'medium'` | |
| `slotProps` | inherited (merged with adornment logic) | — | You can still pass your own `slotProps.input`/`slotProps.htmlInput` — they're merged with (not fully overridden by) the adornment/wheel logic. Legacy `InputProps` is also merged in for backward compatibility. |
| `label`, `value`, `onChange`, `error`, `helperText`, `multiline`, `type`, ... | inherited from `TextFieldProps` | — | Pass through as-is. |

## Usage examples

```tsx
<AppInputBase label="Store name" placeholder="Enter your store name" />
```

```tsx
// With a currency prefix
<AppInputBase label="Price" startAdornmentText="SAR" type="number" />
```

```tsx
// With text transform (force uppercase)
<AppInputBase label="Promo code" transformText={(text) => text.toUpperCase()} />
```

```tsx
// Error state with helper text
<AppInputBase label="Email" error helperText="Enter a valid email address" />
```

```tsx
// Multiline
<AppInputBase label="Notes" multiline minRows={3} />
```

## Composition

- Composes `AppInputAdornmentText` internally for `startAdornmentText`/`endAdornmentText`.
- `AppInputBaseSearch` wraps this component, preconfigured as a search field.

## Anti-patterns

- **Passing `variant`.** It's omitted from the type — don't try to switch to `outlined`/
  `filled`/`standard` through this prop; there is currently no supported way to change the
  variant on `AppInputBase`.
- **Using MUI's `InputAdornment` directly via `slotProps.input.startAdornment`/`InputProps`**
  instead of `startAdornment`/`startAdornmentText`. It will still work (they're merged), but you
  lose the automatic `AppInputAdornmentText` styling for plain text prefixes — prefer
  `startAdornmentText`/`endAdornmentText` for text, and `startAdornment`/`endAdornment` only for
  non-text elements (icons).
- **Passing both `startAdornment` and `startAdornmentText`.** `startAdornment` takes priority —
  `startAdornmentText` is silently ignored in that case. Pick one per side.
- **Relying on wheel-scroll to change a number input's value.** Disabled by default
  (`disableWheelNumberChange` defaults to `true`) — this is intentional to prevent accidental
  edits while scrolling a page that contains number inputs.
