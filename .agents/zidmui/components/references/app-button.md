# AppButton

A button built on MUI's `Button`, with a **restricted, color-dependent set of allowed
variants**, an optional built-in tooltip, and an optional `content` slot alongside `children`.
Use it for any clickable action instead of MUI's `Button` directly, so color/variant
combinations stay consistent with the design system.

## Import

```tsx
import { AppButton } from '@zidsa/zidmui/components/app-button';
import type { AppButtonProps } from '@zidsa/zidmui/components/app-button';
```

## Props

`AppButtonProps` = `Omit<ButtonProps, 'color' | 'variant' | 'href'> & { content?, tooltip?, tooltipProps? } & (one of 7 color/variant branches)`

MUI's `color`, `variant`, and `href` are omitted from the base `ButtonProps` and replaced by the
discriminated union below — a given `color` only allows specific `variant` values:

| `color` | Allowed `variant` |
| --- | --- |
| `primary` | `contained` only |
| `primaryDark` | `text` \| `contained` |
| `primaryLight` | `contained` only |
| `secondary` | `text` \| `outlined` |
| `tertiary` | `contained` \| `outlined` (optional — `variant` can be omitted) |
| `error` | `text` \| `outlined` \| `contained` |
| _(no color)_ | `text` \| `outlined` \| `contained` (optional) |

If `color` is omitted, the resolved color defaults based on `variant`: `outlined`/`text` →
`secondary`, `contained` (or anything else) → `primary`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `color` | see table above | — (resolves per variant, see above) | Restricted color set — **not** MUI's full palette (no `success`, `warning`, `info`). |
| `variant` | depends on `color`, see table above | `'contained'` | Only the variants listed for the chosen `color` are valid. |
| `content` | `React.ReactNode` | — | Extra content rendered after `children` inside the same overflow-safe `Box`. Use for things like a trailing icon or badge that should also ellipsize with the label. |
| `tooltip` | `AppTooltipProps['headline']` | — | If set, wraps the button in `AppTooltip` using this as the tooltip's `headline`. |
| `tooltipProps` | `Omit<AppTooltipProps, 'children'>` | — | Extra props forwarded to the wrapping `AppTooltip` (e.g. `placement`, `description`). Ignored if `tooltip` is not set. |
| `href` | — | — | **Omitted.** `AppButton` always renders `component="button"`; it cannot render as a link. Use a different component (or MUI's `Button` directly) for link buttons. |
| `size`, `disabled`, `onClick`, `startIcon`, `endIcon`, ... | inherited from `ButtonProps` | — | All other MUI `Button` props pass through as-is. |

## Usage examples

```tsx
// Primary — contained only
<AppButton color="primary" variant="contained">
  Save changes
</AppButton>
```

```tsx
// Secondary — text or outlined
<AppButton color="secondary" variant="outlined">
  Cancel
</AppButton>
```

```tsx
// Tertiary — contained or outlined
<AppButton color="tertiary" variant="contained">
  Learn more
</AppButton>
```

```tsx
// Error — text, outlined, or contained
<AppButton color="error" variant="contained">
  Delete account
</AppButton>
```

```tsx
// With a tooltip
<AppButton color="primary" variant="contained" tooltip="Requires admin access" tooltipProps={{ placement: 'top' }}>
  Publish
</AppButton>
```

## Composition

- Wraps `AppTooltip` internally when `tooltip` is provided — you do not need to wrap `AppButton`
  in `AppTooltip` yourself.
- `AppAlert` exports a small preset `AppAlertButton` (`variant="outlined"`, `size="small"`) built
  on top of `AppButton`, intended for use in an alert's `actions` slot.

## Anti-patterns

- **Using MUI's full color palette.** `<AppButton color="success">` is invalid — `AppButton`
  only supports `primary`, `primaryDark`, `primaryLight`, `secondary`, `tertiary`, `error`, or no
  color. For a "success" action, use `color="primary"` or another supported color per the design
  system, not MUI's `success`.
- **Pairing an unsupported color/variant combination.** `<AppButton color="primary"
  variant="outlined">` is invalid — `primary` only allows `variant="contained"`. Check the table
  above before choosing `variant`.
- **Expecting a link button.** `href` is omitted from the type, and the component hardcodes
  `component="button"`. Passing `href` will not render a link; use a router `Link` component
  wrapping the button, or MUI's own `Button` with `component="a"` if you specifically need a
  link that looks like a button.
- **Manually wrapping in a tooltip component.** Don't do
  `<AppTooltip description="..."><AppButton>...</AppButton></AppTooltip>` — use the built-in
  `tooltip`/`tooltipProps` props instead, which handle the wiring correctly.
