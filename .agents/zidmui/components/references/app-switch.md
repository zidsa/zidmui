# AppSwitch

A single switch, built on MUI's `Switch` + `FormControlLabel`. Use it for a standalone boolean
toggle, with or without a visible label.

## Import

```tsx
import { AppSwitch } from '@zidsa/zidmui/components/app-switch';
import type { AppSwitchProps } from '@zidsa/zidmui/components/app-switch';
```

## Props

`AppSwitchProps` = `{ name: string; color?; label?; labelProps?; switchProps? } & Omit<FormControlLabelProps, 'size' | 'control' | 'label'>`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string` | — (required) | Passed to the underlying `Switch`. |
| `color` | `'primary' \| 'error'` | `'primary'` | Narrower than MUI's switch color union. |
| `label` | `React.ReactNode` | — | **If omitted/falsy, the component renders a bare `Switch` with no `FormControlLabel` wrapper at all** — see Anti-patterns. |
| `labelProps` | `TypographyProps` | — | Passed through `slotProps.typography` on the `FormControlLabel` (only when `label` is set). Note: typed as raw MUI `TypographyProps`, not `AppTypographyProps` — unlike most other zidmui components. |
| `switchProps` | `SwitchProps` | — | Extra props for the underlying `Switch`. |
| `size` | — | — | **Omitted** — no way to set switch size through this component's public props. |
| `control`, `label` (base) | — | — | **Omitted** from `FormControlLabelProps` (both redefined/removed as above). |
| `disabled`, `required`, `labelPlacement`, ... | inherited from `FormControlLabelProps` | — | **Only applied when `label` is set** — in the no-label branch, none of these `FormControlLabelProps` reach the DOM (the bare `Switch` only receives `name`, `color`, and `switchProps`). |

## Usage examples

```tsx
<AppSwitch name="notifications" label="Enable notifications" />
```

```tsx
// No visible label — renders a bare Switch
<AppSwitch name="darkMode" />
```

```tsx
// Error color, controlled
<AppSwitch
  name="dangerZone"
  label="Enable dangerous setting"
  color="error"
  checked={enabled}
  onChange={(e) => setEnabled(e.target.checked)}
/>
```

## Composition

Used by `AppSwitchGroup` to render each option (spreads each `AppSwitchProps` option object onto
an `AppSwitch`).

## Anti-patterns

- **Passing `disabled`, `required`, or other `FormControlLabelProps` fields while `label` is
  omitted, expecting them to apply.** They're silently ignored in the no-label branch — the bare
  `Switch` only receives `name`, `color`, and `switchProps`. If you need `disabled` without a
  visible label, put it inside `switchProps={{ disabled: true }}` instead.
- **Passing `size` expecting to control the switch's dimensions.** It's omitted from the type —
  use `switchProps={{ size: '...' }}` if MUI's `Switch` size prop needs to be set (check MUI's
  own `SwitchProps` for valid values).
- **Passing `labelProps` as if it were `AppTypographyProps`** (e.g. expecting a `tooltip` prop
  to work). It's typed as raw MUI `TypographyProps` here — tooltip-related props won't type-check.
