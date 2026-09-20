# AppIconButton

An icon-only button built on MUI's `IconButton`, with an optional built-in tooltip and a
`hideBorder` shortcut. Use it for compact icon actions (toolbar buttons, list row actions).

## Import

```tsx
import { AppIconButton } from '@zidsa/zidmui/components/app-icon-button';
import type { AppIconButtonProps } from '@zidsa/zidmui/components/app-icon-button';
```

## Props

`AppIconButtonProps` = `Omit<IconButtonProps, 'component'> & { content?, href?, tooltip?, tooltipProps?, hideBorder? }`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `color` | inherited (`IconButtonProps['color']`, theme-augmented) | `'secondary'` | The project's theme augments this beyond MUI's stock set (`default`/`error` seen in stories alongside standard values). |
| `size` | inherited (theme-augmented) | `'small'` | Theme augments this beyond MUI's stock sizes (`'extraSmall'` seen used in stories) — check the installed `.d.ts`/theme if a size value seems unavailable. |
| `children` | `React.ReactNode` | — | The icon element. |
| `content` | `React.ReactNode` | — | Extra content rendered after `children` inside the button (e.g. a badge). |
| `href` | `string` | — | Declared in the type, but **not read/used** in the component body — `component` is hardcoded to `"button"` internally, so `href` currently has no effect. Don't rely on it for link behavior. |
| `tooltip` | `string \| null` | — | If truthy, wraps the button in `AppTooltip` using this as the `description`, with `disableInteractive` set. |
| `tooltipProps` | `Omit<AppTooltipProps, 'children' \| 'title'>` | — | Extra props for the wrapping tooltip. |
| `hideBorder` | `boolean` | — | If true, merges `border: 'none'` into `sx` (useful for themes/variants that otherwise draw a border on icon buttons). |
| `component` | — | — | **Omitted.** Hardcoded to `"button"`. |

## Usage examples

```tsx
<AppIconButton tooltip="Edit">
  <IconEditLine />
</AppIconButton>
```

```tsx
<AppIconButton color="error" tooltip="Delete">
  <IconTrashLine />
</AppIconButton>
```

```tsx
<AppIconButton hideBorder size="extraSmall">
  <IconMoreVerticalLine />
</AppIconButton>
```

## Composition

Wraps `AppTooltip` internally (via `Box` around the button, since `Tooltip` needs a single
non-disabled-forwarding child) when `tooltip` is set.

## Anti-patterns

- **Passing `href` expecting link navigation.** It's declared in the type but unused — the
  button always renders as `component="button"`. Use a router link component wrapping the icon,
  or fall back to MUI's `IconButton` with `component="a"` if you need real link behavior.
- **Wrapping in `AppTooltip` manually instead of using `tooltip`.** Use the built-in prop; it
  already sets `disableInteractive` appropriately for icon-only triggers.
