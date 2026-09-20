# AppStatus

A status chip built on MUI's `Chip`, with an optional tooltip. Use it for order/order-item
statuses, tags, or any small labeled indicator.

## Import

```tsx
import { AppStatus } from '@zidsa/zidmui/components/app-status';
import type { AppStatusProps } from '@zidsa/zidmui/components/app-status';
```

## Props

`AppStatusProps` = `Omit<ChipProps, 'size'> & { size?: 'small' | 'medium', tooltip?, tooltipProps? }`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `color` | inherited (`ChipProps['color']`, theme-augmented) | `'neutral'` | Note the default is `'neutral'`, not MUI's own default — the theme likely augments the color union beyond MUI's stock set (seen used with values like `orange`/`blue` in stories). |
| `size` | `'small' \| 'medium'` | `'small'` | Narrower than MUI's `ChipProps['size']`; `'small'` is the default here (MUI itself defaults to `'medium'`). |
| `tooltip` | `TooltipProps['title']` | — | If set, wraps the chip in `AppTooltip` using this as the `description`. |
| `tooltipProps` | `Omit<TooltipProps, 'title' \| 'children'>` | — | Extra props for the wrapping tooltip. Note: typed against raw MUI `TooltipProps`, not `AppTooltipProps` — some `AppTooltip`-specific props (like `headline`) may not type-check here even though `AppTooltip` is used internally. |
| `label`, `variant`, `onDelete`, ... | inherited from `ChipProps` (minus `size`) | — | Pass through as-is. |

## Usage examples

```tsx
// Basic status chip
<AppStatus label="Active" color="success" />
```

```tsx
// Outlined variant
<AppStatus label="Pending" color="warning" variant="outlined" />
```

```tsx
// With a tooltip
<AppStatus label="Draft" color="neutral" tooltip="Not visible to customers yet" />
```

## Composition

- Used by `AppTabs`' `AppTab` for the optional `chip` prop (defaults `color="primary"`,
  `size="small"`, `sx={{ minWidth: 24 }}` there).
- Wraps `AppTooltip` internally when `tooltip` is set — don't wrap `AppStatus` in `AppTooltip`
  yourself.

## Anti-patterns

- **Passing `tooltip` and expecting `AppTooltip`'s `headline`/`content` API.** `tooltip` maps
  only to `AppTooltip`'s `description`, and `tooltipProps` is typed against raw MUI
  `TooltipProps`, not `AppTooltipProps` — you can't set a `headline` this way.
- **Assuming `size="medium"` is the default**, since MUI's own `Chip` defaults to `medium` —
  `AppStatus` defaults to `'small'` instead. Set `size="medium"` explicitly if you want the
  larger chip.
