# AppTooltip

A tooltip built on MUI's `Tooltip`, with a structured title made of `headline` +
`description` + `content` instead of a single `title` node. Use it whenever you need a tooltip
with more than a plain string — for a simple one-line tooltip, `description` alone is enough.

## Import

```tsx
import { AppTooltip } from '@zidsa/zidmui/components/app-tooltip';
import type { AppTooltipProps, AppTooltipTitleProps } from '@zidsa/zidmui/components/app-tooltip';
```

## Props

`AppTooltipProps` = `Omit<TooltipProps, 'title' | 'content'> & AppTooltipTitleProps`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `headline` | `React.ReactNode` | — | Bold-ish heading line. String values are auto-styled; non-string nodes render as-is. |
| `headLintProps` | `TypographyProps` | — | **Note the typo in the actual prop name** — it's `headLintProps`, not `headlineProps`. Only applied when `headline` is a string. |
| `description` | `React.ReactNode` | — | Secondary line below the headline. String values are auto-styled. |
| `descriptionProps` | `TypographyProps` | — | Only applied when `description` is a string. |
| `content` | `React.ReactNode` | — | Extra content rendered below the headline/description block (separate `StackColumn` group, larger gap). String values are auto-styled the same as `description`. |
| `contentProps` | `TypographyProps` | — | Only applied when `content` is a string. |
| `disable` | `boolean` | — | If true, suppresses the tooltip entirely (`title` becomes `undefined`) without needing to conditionally render `AppTooltip` itself. |
| `children` | inherited (`TooltipProps['children']`) | — | The element the tooltip is attached to — required by MUI's `Tooltip`. |
| `title` | — | — | **Omitted.** Use `headline`/`description`/`content` instead. |
| `placement`, `arrow`, `open`, `onClose`, ... | inherited from `TooltipProps` | `placement="top"`, `arrow` on, `disableInteractive` on, `enterDelay={500}` | These defaults are baked in but overridable via props (spread after the defaults). |

## Usage examples

```tsx
// Simple one-line tooltip
<AppTooltip description="This field is required">
  <span>Field label</span>
</AppTooltip>
```

```tsx
// Headline + description
<AppTooltip headline="Total sales" description="Amount spent across all channels this month">
  <IconInformationLine />
</AppTooltip>
```

```tsx
// Conditionally disabled
<AppTooltip description="Only visible to admins" disable={!isAdmin}>
  <AppButton color="primary" variant="contained">Settings</AppButton>
</AppTooltip>
```

```tsx
// Custom content node instead of a string
<AppTooltip headline="Order #1029" content={<CustomOrderPreview id={1029} />}>
  <span>Order details</span>
</AppTooltip>
```

## Composition

- Used internally by `AppButton`, `AppTypography`, `AppStatus`, `AppIconButton`, and
  `AppIconWithTooltip` for their own `tooltip`/`tooltip`-adjacent props. In most cases, prefer
  using those components' built-in `tooltip` prop over wrapping them in `AppTooltip` manually.
- Uses `StackColumn` internally for layout — no action needed.

## Anti-patterns

- **Using `headlineProps` instead of `headLintProps`.** The correct (if misspelled) prop name is
  `headLintProps`. `headlineProps` will silently do nothing (extra prop, not read).
- **Passing `title` directly.** It's omitted from the type — use `headline`/`description`/
  `content` instead. If you only have a single string, put it in `description`.
- **Wrapping an already-tooltip-enabled zidmui component in another `AppTooltip`.** Components
  like `AppButton`/`AppStatus`/`AppTypography` already support `tooltip`/`tooltipProps` — use
  those instead of nesting a second `AppTooltip` around them.
