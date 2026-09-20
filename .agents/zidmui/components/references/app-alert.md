# AppAlert

An inline alert/banner built on MUI's `Alert`, with structured `title`/`content` slots, an
optional `link`, an `actions` row, and a loading state. Use it for inline notices (success,
warning, error, info) inside a page — not for transient toasts.

## Import

```tsx
import { AppAlert, AppAlertButton } from '@zidsa/zidmui/components/app-alert';
import type { AppAlertProps } from '@zidsa/zidmui/components/app-alert';
```

## Props

`AppAlertProps` = `Omit<AlertProps, 'title' | 'content'> & { title?, titleProps?, link?, content?, actions?, isLoading? }`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string \| React.ReactNode` | — | Rendered via MUI's `AlertTitle` (`variant="subtitle2"`). Overrides MUI's `AlertProps['title']`, which is omitted. |
| `titleProps` | `AlertTitleProps` | — | Extra props for the `AlertTitle` element. |
| `content` | `React.ReactNode` | — | Body text, rendered via `AppTypography` (`variant="body2"`). Color auto-adjusts: `text.tertiary` if there's a `title`, `text.primary` otherwise, unless `variant="filled"` (then no explicit color override). Overrides MUI's `AlertProps['content']`, which is omitted (MUI's `Alert` doesn't actually have a `content` prop, so this Omit is mostly for API clarity). |
| `link` | `React.ReactNode` | — | Rendered directly below `content`, inside the same column. |
| `children` | `React.ReactNode` | — | Rendered after `link`, inside the same column — use for anything not covered by `content`/`link`. |
| `actions` | `React.ReactNode` | — | Rendered in a `StackRow` below the main content. Hidden while `isLoading` is true. |
| `isLoading` | `boolean` | `false` | If true, the alert renders **only** a centered `CircularProgress` — `title`, `content`, `link`, `children`, and `actions` are all suppressed. |
| `variant` | inherited (`AlertProps['variant']`) | `'standard'` | Standard MUI alert variant (`standard` \| `filled` \| `outlined`). |
| `severity`, `color`, `onClose`, `icon`, ... | inherited from `AlertProps` | — | Pass through as-is. |

## Usage examples

```tsx
// Simple informational alert
<AppAlert severity="info" title="Heads up" content="Your changes are saved automatically." />
```

```tsx
// Error alert with an action
<AppAlert
  severity="error"
  title="Something went wrong"
  content="We couldn't process your payment."
  actions={<AppAlertButton color="error">Retry</AppAlertButton>}
/>
```

```tsx
// Loading state
<AppAlert severity="info" isLoading />
```

```tsx
// Content only, no title
<AppAlert severity="warning" content="This action cannot be undone." />
```

## Composition

- `AppAlertButton` is exported alongside `AppAlert` specifically for use in `actions` — it's an
  `AppButton` preset (`variant="outlined"`, `size="small"`). Prefer it over a raw `AppButton` in
  alert actions for consistent sizing.
- Uses `AppTypography`, `StackRow`, and `StackColumn` internally — no action needed, just be
  aware `content`'s color styling comes from `AppTypography`'s `color` prop conventions.

## Anti-patterns

- **Passing MUI's `title` prop expecting the native `AlertTitle` behavior.** `title` here is
  zidmui's own prop (typed as `string | React.ReactNode`) — it still renders `AlertTitle`
  internally, so in practice a plain string works fine, but don't pass JSX assuming it bypasses
  zidmui's title styling; it doesn't, `titleProps` is the escape hatch for that.
   - Note: MUI's `AlertProps` has no native `title` conflict in practice (browsers only special-case a DOM `title` attribute), but the type omits it anyway for clarity — treat `title` as zidmui's slot, not a raw HTML attribute.
- **Combining `isLoading` with `actions`, expecting both to show.** They're mutually exclusive
  by design — `isLoading` short-circuits the entire content tree, including `actions`. If you
  need a spinner alongside actions, build that manually rather than relying on `isLoading`.
- **Forgetting `severity`.** `AppAlert` doesn't default `severity` (that's MUI's own default,
  `'success'`) — if you want a specific alert type (error/warning/info), always set `severity`
  explicitly.
