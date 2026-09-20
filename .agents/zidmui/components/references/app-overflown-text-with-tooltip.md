# AppOverflownTextWithTooltip

Text that shows a tooltip **only when the text is actually visually truncated** (single-line
ellipsis or 2-line clamp). Use it for table cells, list item labels, or any place where text
might overflow and you want a tooltip only in that case, not always.

## Import

```tsx
import { AppOverflownTextWithTooltip } from '@zidsa/zidmui/components/app-overflown-text-with-tooltip';
import type { AppOverflownTextWithTooltipProps } from '@zidsa/zidmui/components/app-overflown-text-with-tooltip';
```

## Props

`AppOverflownTextWithTooltipProps` is a standalone object type.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` | — (required) | The text to render **and** the tooltip's content when truncated. There's no separate prop for a different tooltip text — the same string is both the visible label and the tooltip description. |
| `typographyProps` | `AppTypographyProps` | — | Extra props for the underlying styled `AppTypography`. |
| `twoLines` | `boolean` | `false` (falsy) | If true, clamps to 2 lines (`-webkit-line-clamp: 2`) and checks overflow by height instead of width. |
| `tooltipProps` | `Omit<AppTooltipProps, 'children'>` | — | Extra props for the tooltip (applied via spread `...props`, not a fixed key — see note below). |

Note: the component signature destructures `title`, `typographyProps`, `twoLines`, and spreads
the rest as `...props` directly onto `AppTooltip` — so any `AppTooltipProps` key (not just
`tooltipProps`) can technically be passed at the top level (e.g. `placement` directly, not
nested under `tooltipProps`). The type list above documents the intended prop; check the
installed `.d.ts` if you need the exact spread signature.

## Usage examples

```tsx
// Truncates with ellipsis; tooltip only shows if actually cut off
<Box maxWidth={200}>
  <AppOverflownTextWithTooltip title="A very long product name that might not fit" />
</Box>
```

```tsx
// Two-line clamp variant
<Box maxWidth={240}>
  <AppOverflownTextWithTooltip
    title="A longer description that wraps onto a second line and may still get cut off"
    twoLines
  />
</Box>
```

## Composition

- Used internally by `AppListItem` for `textLabel`, `textDescription` (with `twoLines`), and
  `textContent` (with `twoLines`) whenever those are passed as plain strings.
- Wraps `AppTooltip` and a styled `AppTypography` internally.

## Anti-patterns

- **Expecting a tooltip with different text than the visible label.** `title` drives both — if
  you need a different tooltip message, don't use this component; compose `AppTypography` (with
  `noWrap`/manual truncation styles) and `AppTooltip` yourself instead.
- **Using this for text that is never expected to overflow.** The mouse-enter measurement logic
  adds a small amount of overhead for no benefit if truncation never happens — use plain
  `AppTypography` instead when overflow isn't a concern.
- **Forgetting to constrain the parent's width.** Truncation only kicks in if the parent
  actually constrains width (e.g. `maxWidth`, a fixed-width table cell, flex `overflow: hidden`
  ancestor) — without that, the text will never register as overflown and no tooltip will show.
