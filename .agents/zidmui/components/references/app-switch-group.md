# AppSwitchGroup

A group of `AppSwitch` components rendered from an `options` array, wrapped in a labeled
`FormControl`. Use it for a vertical list of related toggle settings (e.g. notification
preferences).

## Import

```tsx
import { AppSwitchGroup } from '@zidsa/zidmui/components/app-switch-group';
import type { AppSwitchGroupProps } from '@zidsa/zidmui/components/app-switch-group';
```

## Props

`AppSwitchGroupProps` is a standalone object type (does not extend a single MUI props type at
the top level).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `options` | `AppSwitchProps[]` | — (required) | Each item is a full `AppSwitchProps` object (needs at least `name`). Rendered as `<AppSwitch key={option.name} color={color} required={required} {...option} />` — **per-option `color`/`required` override the group-level values**, since `{...option}` is spread after them. |
| `label` | `React.ReactNode` | — | Group label, rendered via `FormLabel`. |
| `helperText` | `string` | — | Shown via `FormHelperText`, but only rendered if `helperText.length` is truthy **or** `error` is truthy — see Anti-patterns for a rendering quirk when `error` is `true`. |
| `color` | `'primary' \| 'error'` | `'primary'` | Group-level default color for every switch (overridable per-option). |
| `disabled` | `boolean` | — | Passed to the `FormControl` (does **not** automatically cascade into disabling each `AppSwitch` — set `disabled` per-option, or via `option.switchProps`, if you need switches individually disabled). |
| `required` | `boolean` | — | Applied to every `AppSwitch` (overridable per-option, same spread-order caveat as `color`). |
| `error` | `boolean` | — | Styles the `FormControl` and helper text as an error. |
| `formControlProps` | `FormControlProps` | — | Extra props for the wrapping `FormControl`. |

`options[].name` is used as the React `key` — **duplicate names across options will cause key
collisions** and unpredictable rendering.

## Usage examples

```tsx
<AppSwitchGroup
  label="Notification preferences"
  options={[
    { name: 'email', label: 'Email notifications' },
    { name: 'sms', label: 'SMS notifications' },
  ]}
/>
```

```tsx
// With helper text
<AppSwitchGroup
  label="Privacy settings"
  helperText="Changes apply immediately"
  options={[{ name: 'publicProfile', label: 'Make profile public' }]}
/>
```

```tsx
// Per-option color override
<AppSwitchGroup
  label="Alerts"
  color="primary"
  options={[
    { name: 'info', label: 'Info alerts' },
    { name: 'critical', label: 'Critical alerts', color: 'error' },
  ]}
/>
```

## Composition

Wraps `AppSwitch` for each option — see `app-switch.md` for what each option object can
contain (it's the same `AppSwitchProps` shape).

## Anti-patterns

- **Setting `error={true}` together with `helperText` and expecting the helper text to show.**
  The component renders `{error || helperText}` as the `FormHelperText` content — since `error`
  here is a JS boolean, `error || helperText` evaluates to `true` (not `helperText`) whenever
  `error` is truthy, and React will render the literal text `"true"` instead of your message.
  This is a real bug in the current implementation: **when using `error`, don't also rely on
  `helperText` to show your error message** — there's currently no separate error-message prop.
  If you need a specific message alongside `error`, consider building a custom `FormHelperText`
  next to `AppSwitchGroup` instead, or wait for a fixed version (check the installed `.d.ts`/
  changelog).
- **Assigning duplicate `name` values across options.** Names double as React keys — keep them
  unique.
- **Expecting `disabled` on the group to disable each switch.** It only disables/styles the
  `FormControl` wrapper — set `disabled` on individual `options[]` entries (or their
  `switchProps`) if you need the switches themselves to be non-interactive.
