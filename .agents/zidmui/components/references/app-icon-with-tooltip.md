# AppIconWithTooltip

A small info icon (defaults to an "i" icon) with a tooltip, and an invisible but tappable hit
area for accessibility on touch devices. Use it for inline "more info" hints next to labels —
not as a general-purpose tooltip trigger for arbitrary content (use `AppTooltip` directly for
that).

## Import

```tsx
import { AppIconWithTooltip } from '@zidsa/zidmui/components/app-icon-with-tooltip';
import type { AppIconWithTooltipProps } from '@zidsa/zidmui/components/app-icon-with-tooltip';
```

## Props

`AppIconWithTooltipProps` is a standalone object type (not tied to a single MUI component's
props).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `tooltip` | `AppTooltipProps['description']` | — | **Required in practice** — if falsy, the component renders nothing at all (returns `undefined`). |
| `tooltipProps` | `Omit<AppTooltipProps, 'children'>` | — | Extra props for the tooltip (e.g. `headline`, `placement`). |
| `icon` | `React.ReactNode` | `<IconInformationLine fontSize="inherit" color="action" />` | Custom icon to show instead of the default info icon. |
| `iconProps` | `SvgIconOwnProps` | — | Extra props merged onto the **default** icon only — has no effect if a custom `icon` is passed, since that branch doesn't apply `iconProps`. |
| `accessibleAreaWidth` | `string` | `'36px'` | Width of the invisible tappable hit area shown only on touch/coarse-pointer devices. |
| `accessibleAreaHeight` | `string` | `'36px'` | Height of the invisible tappable hit area. |

## Usage examples

```tsx
<AppIconWithTooltip tooltip="This value is calculated automatically and cannot be edited." />
```

```tsx
// Custom icon
<AppIconWithTooltip icon={<IconAlertCircleLine fontSize="inherit" />} tooltip="Action required" />
```

```tsx
// Next to a label
<StackRow gap={0.5} alignItems="center">
  <AppTypography variant="body2">Net revenue</AppTypography>
  <AppIconWithTooltip tooltip="Revenue after fees and refunds" />
</StackRow>
```

## Composition

Wraps `AppTooltip` and uses `StackRow` internally. `AppListItem` uses this component internally
for its own `tooltip` string prop — you generally don't need to compose the two manually.

## Anti-patterns

- **Passing `iconProps` alongside a custom `icon`, expecting it to apply.** `iconProps` only
  affects the default `IconInformationLine` icon — when you supply your own `icon`, style it
  directly on that element instead.
- **Omitting `tooltip`.** Without it, the component renders nothing (not even the icon) — don't
  use this component for a "decorative only" info icon with no tooltip text; use a plain icon
  component instead in that case.
- **Using this for tooltips on large/complex content.** It's purpose-built for a small inline
  info icon with a mobile-friendly hit area — for tooltips on arbitrary elements (buttons, chips,
  text), use `AppTooltip` directly instead.
