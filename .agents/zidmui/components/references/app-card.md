# AppCard

A card container built on MUI's `Card`, with a structured header (title/description/prefix/
suffix/action/divider) and an actions row that auto-hides while loading. Use it for any
card-shaped content block instead of composing MUI's `Card`/`CardHeader`/`CardContent` manually.

## Import

```tsx
import { AppCard } from '@zidsa/zidmui/components/app-card';
import type { AppCardProps, AppCardColor, AppCardCorners } from '@zidsa/zidmui/components/app-card';
```

## Props

`AppCardProps` is a standalone object type (not an `Omit<CardProps, ...>`), but unrecognized
props are spread onto the underlying MUI `Card`, so most `CardProps` (e.g. `elevation`,
`variant`, `sx`, `onClick`) still work even though they aren't explicitly listed in the type.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `color` | `'primary' \| 'success' \| 'error' \| 'warning' \| 'info' \| 'neutral'` | — | Passed straight through to `Card`. Not MUI's `Card` color prop (MUI's `Card` has no native `color`) — this relies on a theme augmentation. |
| `roundedCorners` | `'grouped' \| 'all'` | — | Declared in the type but not read/used inside the component body itself — check the installed `.d.ts`/theme if you need this to actually change rendering; otherwise treat it as currently inert. |
| `title` | `string \| React.ReactNode` | — | String titles render via `AppTypography` (`variant="h6"`, `color="text.primary"`); non-string nodes render as-is (bypassing typography styling entirely). |
| `headerProps` | `StackRowProps` | — | Props for the header row (a `StackRow`-based styled component with padding and gap; collapses to `display: none` when empty). |
| `titleContainerProps` | `StackColumnProps` | — | Props for the column wrapping title + description. |
| `titleProps` | `AppTypographyProps` | — | Only applied when `title` is a string (passed to the internal `AppTypography`). |
| `titlePrefix` | `React.ReactNode` | — | Rendered first inside the header, before the title column. |
| `titleSuffix` | `React.ReactNode` | — | Rendered inline right after a string `title` (ignored for non-string titles). |
| `titleAction` | `React.ReactNode` | — | Rendered in its own `StackRow` after the title column (e.g. a menu button). |
| `titleDivider` | `boolean` | — | If true, renders a `Divider` between the title and description. |
| `description` | `React.ReactNode` | — | Rendered via `AppTypography` (`variant="body2"`, `color="text.primary"`, `whiteSpace="pre-line"`). |
| `descriptionProps` | `AppTypographyProps` | — | Extra props for the description's `AppTypography`. |
| `children` | `React.ReactNode` | — | Main card body, rendered inside `CardContent`. |
| `cardContentProps` | `CardContentProps` | — | Extra props for the `CardContent` wrapper. |
| `loading` | `boolean` | — | When true, the `actions` row is hidden (nothing else changes automatically — no built-in spinner). |
| `actions` | `React.ReactElement \| null \| (React.ReactElement \| null)[]` | — | Rendered right-aligned in a `StackRow` below `children`. Hidden while `loading`. |
| `actionsProps` | `StackRowProps` | — | Extra props for the actions row. |

## Usage examples

```tsx
// Basic card with title and description
<AppCard title="Store settings" description="Manage your store preferences." />
```

```tsx
// Card with actions
<AppCard title="Delete this product?" description="This cannot be undone.">
  <AppButton color="error" variant="contained">Delete</AppButton>
</AppCard>
```

```tsx
// Card with a title action (e.g. an icon button in the header)
<AppCard
  title="Recent orders"
  titleAction={<AppIconButton tooltip="Refresh"><IconRefreshLine /></AppIconButton>}
>
  {/* order list */}
</AppCard>
```

```tsx
// Card with color and rounded corners
<AppCard color="error" title="Payment failed" description="Update your payment method." />
```

## Composition

- Uses `AppTypography` for `title`/`description`, `StackRow`/`StackColumn` for layout. If you
  need custom title styling beyond `titleProps`, pass a non-string `title` (a full JSX node) —
  it bypasses the built-in `AppTypography` wrapper entirely.

## Anti-patterns

- **Passing a JSX node as `title` and expecting `titleProps`/`titleSuffix` to apply.** Both are
  only wired up for **string** titles. If `title` is already a `React.ReactNode`, it's rendered
  verbatim — style it yourself.
- **Expecting `actions` to show while `loading` is true.** They're intentionally hidden; build
  your own loading UI in `children` if you need a spinner alongside a card that would otherwise
  show actions.
- **Passing a single JSX element to `actions` and forgetting it must be a valid element (or
  array of them), not a boolean/string.** The type is
  `React.ReactElement | null | (React.ReactElement | null)[]` — conditionally rendering with
  `condition && <Button />` is fine (evaluates to `false`, which... note the type doesn't include
  `boolean`, so prefer `condition ? <Button /> : null` to stay type-safe).
