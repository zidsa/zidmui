# AppIconBox

A colored, rounded box for wrapping a single icon, built on MUI's `Box`. Use it for icon
"avatars" in list items, cards, or empty states where a colored circular/rounded icon background
is needed.

## Import

```tsx
import { AppIconBox } from '@zidsa/zidmui/components/app-icon-box';
import type { AppIconBoxProps, AppIconBoxbackgroundColor, AppIconBoxSize } from '@zidsa/zidmui/components/app-icon-box';
```

Note: the exported type is named `AppIconBoxbackgroundColor` (lowercase `b` in `background`) —
this is the actual exported name, not a typo to fix on your end.

## Props

`AppIconBoxProps` = `Omit<BoxProps, 'color'> & { children: React.ReactNode; background?, size? }`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `React.ReactNode` | — (required) | The icon element to display centered inside the box. |
| `background` | `'default' \| 'primary' \| 'blue' \| 'red' \| 'green' \| 'yellow' \| 'orange' \| 'secondary' \| 'white'` | `'default'` | Background color, theme-aware (has separate dark-mode values). |
| `size` | `'small' \| 'medium' \| 'large'` | `'large'` | Controls both the box's dimensions (24/40/48px) and the icon's font size (16/20/unset for large — large relies on the icon's own size). |
| `color` | — | — | **Omitted** from `BoxProps` (avoids clashing with the `background` prop's role) — set icon color on the icon element itself, not on `AppIconBox`. |
| other `BoxProps` (`sx`, `onClick`, ...) | inherited | — | Pass through as-is. |

## Usage examples

```tsx
<AppIconBox background="primary">
  <IconShoppingCartLine />
</AppIconBox>
```

```tsx
// Small icon box
<AppIconBox background="red" size="small">
  <IconAlertTriangleLine />
</AppIconBox>
```

```tsx
// Default (neutral) background
<AppIconBox>
  <IconFolderLine />
</AppIconBox>
```

## Composition

No sibling zidmui component imports. Commonly paired with `AppCard`/`AppListItem`/
`AppEmptyState` layouts as the leading icon element, though those components don't use
`AppIconBox` internally themselves (e.g. `AppEmptyState` hand-rolls its own icon circle).

## Anti-patterns

- **Passing `color` expecting it to tint the box background.** `color` is omitted — use
  `background` for the box's background color, and set the icon's own `color` prop on the child
  icon element directly.
- **Expecting `size="medium"`/`"small"` to shrink an oversized custom icon automatically for
  every icon type.** The size-based `fontSize`/`width`/`height` CSS targets `svg` descendants
  generically — most zidmui icon components should scale correctly, but a custom non-`svg` child
  won't be affected by these size rules.
