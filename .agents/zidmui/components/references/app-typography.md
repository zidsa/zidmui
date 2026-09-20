# AppTypography

Typography built on MUI's `Typography`, restricted to theme-driven `variant` styling (no
freeform `fontSize`/`fontWeight`/`fontStyle`), with an optional built-in tooltip. Use it instead
of MUI's `Typography` for any text in a zidmui-based UI, so text always matches a defined theme
variant.

## Import

```tsx
import { AppTypography } from '@zidsa/zidmui/components/app-typography';
import type { AppTypographyProps } from '@zidsa/zidmui/components/app-typography';
```

## Props

`AppTypographyProps` = `Omit<TypographyProps, 'fontSize' | 'fontWeight' | 'fontStyle'> & { variant?, tooltip?, tooltipProps? }`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `TypographyVariant` | `'body1'` | Same variant names as MUI (`h1`-`h6`, `body1`, `body2`, `caption`, `subtitle1`, `subtitle2`, `overline`, etc.), but this is the only way to control text size/weight/style. |
| `tooltip` | `string \| null` | — | If truthy, wraps the text in `AppTooltip` using this as the `description`. |
| `tooltipProps` | `Omit<AppTooltipProps, 'children'>` | — | Extra props for the wrapping tooltip. |
| `fontSize`, `fontWeight`, `fontStyle` | — | — | **Omitted.** Cannot be set directly — use `variant`, or drop to MUI's `Typography` if you truly need freeform sizing outside the theme's variants. |
| `color`, `align`, `component`, `sx`, ... | inherited from `TypographyProps` | — | Pass through as-is. |

## Usage examples

```tsx
// Heading
<AppTypography variant="h6">Store settings</AppTypography>
```

```tsx
// Body text with color
<AppTypography variant="body2" color="text.tertiary">
  Last updated 2 hours ago
</AppTypography>
```

```tsx
// With a tooltip
<AppTypography variant="body2" tooltip="Calculated at checkout">
  Estimated total
</AppTypography>
```

## Composition

- Used pervasively as the text primitive inside nearly every other zidmui component
  (`AppCard`, `AppAlert`, `AppEmptyState`, `AppAccordion`, `AppListItem`, `AppInputAdornmentText`,
  etc.). When building custom layouts alongside zidmui components, prefer `AppTypography` over
  raw MUI `Typography` or plain `<span>`/`<p>` tags for visual consistency.
- Wraps `AppTooltip` internally when `tooltip` is set.

## Anti-patterns

- **Trying to set `fontSize`/`fontWeight`/`fontStyle` directly.** These are omitted from the
  type — a TypeScript error will catch this, but if not type-checked strictly, the props would
  just be silently dropped since MUI's `Typography` itself reads them from `variant`/`sx`, not
  loose top-level style props in this context. Use `variant`, or `sx={{ fontWeight: ... }}` as
  an escape hatch if the design truly requires a one-off weight.
- **Using MUI's `Typography` directly in a zidmui-based screen "just for this one label."** This
  breaks tooltip and variant consistency with the rest of the UI — use `AppTypography` even for
  incidental text.
