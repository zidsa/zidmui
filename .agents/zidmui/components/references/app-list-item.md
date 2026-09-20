# AppListItem

A list item built on MUI's `ListItem`, with icon, auto-truncating label/description/content
slots, and an optional inline info tooltip. Use it inside an MUI `List` for rows that need more
structure than a single line of text.

## Import

```tsx
import { AppListItem, AppListItemContent } from '@zidsa/zidmui/components/app-list-item';
import type { AppListItemProps } from '@zidsa/zidmui/components/app-list-item';
```

## Props

`AppListItemProps` = `Omit<ListItemProps, 'value'> & { icon?, iconProps?, textLabel?, textLabelProps?, textDescription?, textContent?, textContentProps?, children?, labelSuffix?, tooltip? }`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `icon` | `React.ReactNode` | — | Rendered inside `ListItemIcon`. |
| `iconProps` | `ListItemIconProps` | — | Extra props for `ListItemIcon`. |
| `textLabel` | `React.ReactNode` | — | Primary label. **String** values are auto-wrapped in `AppOverflownTextWithTooltip` (single line, `variant="body2"`, `color="text.secondary"`); non-string nodes are wrapped in plain `AppTypography` instead (no auto-truncation). |
| `textLabelProps` | `ListItemTextProps` | `{}` | Props for the underlying MUI `ListItemText`. If you set `textLabelProps.primary` yourself, it overrides the built-in label rendering entirely (the built-in `textLabel`/`tooltip` composition is skipped for `primary`, but `slotProps` handling changes accordingly — see source note below). |
| `textDescription` | `React.ReactNode` | — | Rendered as `ListItemText`'s `secondary`. **String** values get `AppOverflownTextWithTooltip` with `twoLines`; non-string nodes get plain `AppTypography` (`variant="caption"`). |
| `textContent` | `React.ReactNode` | — | Extra content rendered after the `ListItemText` block. **String** values get `AppOverflownTextWithTooltip` with `twoLines`; non-string nodes get plain `AppTypography` (`variant="body2"`). |
| `textContentProps` | `AppTypographyProps` | — | Only applied when `textContent` is a **non-string** node (the string branch uses `AppOverflownTextWithTooltip`'s own `typographyProps`, not this). |
| `children` | `React.ReactNode` | — | Rendered after everything else. |
| `labelSuffix` | `React.ReactNode` | — | Rendered next to `textLabel` in a `StackRow` (e.g. a status chip). Forces `textLabel` into a row layout when present. |
| `tooltip` | `string` | — | Renders a small `AppIconWithTooltip` next to the label. |
| `value` | — | — | **Omitted** from `ListItemProps`. |

## Usage examples

```tsx
<AppListItem
  icon={<AppIconBox background="primary"><IconBoxLine /></AppIconBox>}
  textLabel="Order #1029"
  textDescription="Placed 2 hours ago"
/>
```

```tsx
// With a status chip as labelSuffix
<AppListItem
  textLabel="Product A"
  textDescription="12 variants"
  labelSuffix={<AppStatus label="Active" color="success" size="small" />}
/>
```

```tsx
// With an inline info tooltip
<AppListItem textLabel="Net total" tooltip="After fees and discounts" textContent="$1,204.00" />
```

## Composition

- Internally composes `AppIconWithTooltip`, `AppOverflownTextWithTooltip`, `AppTypography`, and
  `StackRow`.
- `AppListItemContent` is exported alongside as a small standalone helper
  (`AppTypography` preset: `variant="body2"`, `color="text.secondary"`) for freeform content that
  doesn't fit `textLabel`/`textDescription`/`textContent`.

## Anti-patterns

- **Passing a JSX node to `textLabel`/`textDescription`/`textContent` and expecting automatic
  truncation-with-tooltip.** That behavior only applies to **string** values — a JSX node is
  rendered as-is (wrapped in a plain, non-truncating `AppTypography`). If you need truncation
  for custom-styled text, use `AppOverflownTextWithTooltip` directly yourself.
- **Setting `textLabelProps.primary` while also passing `textLabel`.** Whichever renders depends
  on internal `slotProps` logic checking for `textLabelProps.primary` — avoid setting both to
  prevent ambiguity; pick one approach (either `textLabel`, or full manual control via
  `textLabelProps.primary`).
- **Using `tooltip` when you want a tooltip on the whole row, not just the label icon.** `tooltip`
  only renders a small dedicated info icon next to the label — it does not attach a tooltip to
  the entire list item. Wrap the whole `AppListItem` in `AppTooltip` yourself if that's the goal.
