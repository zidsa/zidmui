# AppEmptyState

A full empty/error/success/warning state placeholder with an icon (or image), title,
description, sub-description, and action area. Use it for empty lists, 404 pages, access-denied
screens, or generic error states.

## Import

```tsx
import { AppEmptyState } from '@zidsa/zidmui/components/app-empty-state';
import type { AppEmptyStateProps } from '@zidsa/zidmui/components/app-empty-state';
```

## Props

`AppEmptyStateProps` is a standalone interface (does not extend a single MUI component's props).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `'standard' \| 'small'` | `'small'` | Controls icon size (`medium`/`large`), icon circle size (100px/120px), and title variant (`h6`/`h4`). Note the default is `'small'`, the visually more compact option. |
| `variant` | `'default' \| 'error' \| 'warning' \| 'success'` | `'default'` | Colors the icon circle's background/border using theme alert colors; also tints the icon `error` when `variant="error"`. |
| `title` | `React.ReactNode` | — | Rendered via `AppTypography` at the size-dependent variant. |
| `titleProps` | `AppTypographyProps` | — | Extra title typography props. |
| `icon` | `React.ReactElement<SvgIconProps>` | — | Rendered inside a themed circular box, unless `icon.props.component === 'img'` (then rendered as-is, no circle). Cloned internally with `fontSize`/`color` defaults applied. |
| `iconProps` | `SvgIconProps` | — | Merged onto the cloned `icon` element (only used in the "icon in circle" branch). |
| `iconBoxProps` | `BoxProps` | — | Extra props for the circular icon box. |
| `customIconComponent` | `React.ReactElement<SvgIconProps>` | — | Fallback rendered only if **neither** `icon` nor `imageUrl` is provided — bypasses the circular box entirely (rendered raw, like the `img`-icon branch). |
| `description` | `React.ReactNode` | — | Rendered via `AppTypography` (`variant="body2"`, `color="textTertiary"`). |
| `descriptionProps` | `AppTypographyProps` | — | Extra description typography props. |
| `subDescription` | `React.ReactNode` | — | Rendered below `description` with extra top margin. |
| `subDescriptionProps` | `AppTypographyProps` | — | Extra sub-description typography props. |
| `imageUrl` | `string` | — | If set, takes priority over `icon`/`customIconComponent` — renders a 240×160 image instead of any icon. |
| `imageProps` | `BoxProps` | — | Extra props for the image `Box`. |
| `children` | `React.ReactNode` | — | Rendered in a `StackRow` below the text block (typically action buttons). |
| `containerProps` | `BoxProps` | — | Extra props for the outer container `Box`. |

Icon/image precedence: `imageUrl` > `icon` (circle-wrapped, unless it's an `<img>`) > `icon` as
raw `<img>` > `customIconComponent`.

## Usage examples

```tsx
// Generic empty state
<AppEmptyState
  icon={<IconInboxLine />}
  title="No orders yet"
  description="Orders will show up here once customers start buying."
/>
```

```tsx
// Error variant with actions
<AppEmptyState
  variant="error"
  icon={<IconAlertTriangleLine />}
  title="Something went wrong"
  description="We couldn't load this page. Please try again."
>
  <AppButton color="secondary" variant="outlined">Go back</AppButton>
  <AppButton color="primary" variant="contained">Retry</AppButton>
</AppEmptyState>
```

```tsx
// Compact size, with an image instead of an icon
<AppEmptyState size="small" imageUrl="/empty-cart.svg" title="Your cart is empty" />
```

## Composition

Uses `AppTypography`, `StackColumn`, `StackRow` internally. Does **not** reuse `AppIconBox` for
its icon circle — it implements its own circular box with variant-based coloring, so don't
expect `AppIconBox`'s `background` color names to apply here.

## Anti-patterns

- **Passing both `icon` and `imageUrl`.** `imageUrl` always wins — the icon is ignored entirely
  in that case. Pick one.
- **Expecting `variant="warning"`/`variant="success"` to tint the icon color like `error` does.**
  Only the circle's background/border change for warning/success — the icon `color` prop stays
  `'action'` (the `error` variant is the only one that also sets `iconColor = 'error'`).
- **Passing a non-SVG custom element to `icon` without `component="img"`.** The component checks
  specifically for `icon.props.component === 'img'` to skip the circular wrapper — any other
  custom element will be forced into the circle via `React.cloneElement`, which may not render
  correctly for non-icon elements.
