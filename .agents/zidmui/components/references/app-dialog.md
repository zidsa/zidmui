# AppDialog

A modal dialog built on MUI's `Dialog`, with structured title/description/content/actions slots
and a `darkerBackdrop` option. Use it for any modal — for a dialog that also needs built-in
search/pagination/loading, use `AppDialogWithFeatures` instead (see `app-dialog-with-features.md`).

## Import

```tsx
import { AppDialog } from '@zidsa/zidmui/components/app-dialog';
import type { AppDialogProps } from '@zidsa/zidmui/components/app-dialog';
```

## Props

`AppDialogProps` = `DialogProps & { title?, description?, descriptionProps?, titleStackProps?, titleProps?, actions?, actionsProps?, children?, dialogContentProps?, darkerBackdrop? }`

Fully extends MUI's `DialogProps` (no omissions) — `open`, `onClose`, `fullScreen`, `slotProps`,
`sx`, etc. are all inherited as-is.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `React.ReactNode` | — | Rendered inside `DialogTitle`, above `description`. |
| `description` | `React.ReactNode` | — | Rendered via `AppTypography` (`variant="body2"`) below `title`, inside the same `StackColumn`. Only rendered if `title` or `description` is set (the whole `DialogTitle` block is skipped otherwise). |
| `descriptionProps` | `AppTypographyProps` | — | Extra props for the description typography. |
| `titleStackProps` | `StackProps` | — | Props for the `StackColumn` wrapping title + description (default `gap={3}`). |
| `titleProps` | `DialogTitleProps` | — | Extra props for the `DialogTitle` element itself. |
| `actions` | `React.ReactNode` | — | Rendered inside `DialogActions`. Only rendered if `actions` is truthy. |
| `actionsProps` | `DialogActionsProps` | — | Extra props for `DialogActions`. |
| `children` | `React.ReactNode` | — | Main dialog body, always rendered inside `DialogContent`. |
| `dialogContentProps` | `DialogContentProps` | — | Extra props for `DialogContent`. |
| `darkerBackdrop` | `boolean` | — | If true, sets the backdrop background to `theme.palette.background.darkBackdrop`. |
| `fullWidth` | inherited | `true` (hardcoded default, overridable) | |
| `maxWidth` | inherited | `'sm'` (hardcoded default, overridable) | |
| `slotProps.paper.elevation` | via `slotProps` | `4` | Set internally; your own `slotProps.paper` is merged in (your values win for matching keys since they're spread after the default). |
| `open`, `onClose`, ... | inherited from `DialogProps` | — | Standard MUI dialog control props. |

## Usage examples

```tsx
const [open, setOpen] = useState(false);

<AppDialog open={open} onClose={() => setOpen(false)} title="Delete order?" description="This cannot be undone.">
  <AppTypography variant="body2">Order #1029 will be permanently removed.</AppTypography>
</AppDialog>
```

```tsx
// With actions
<AppDialog
  open={open}
  onClose={() => setOpen(false)}
  title="Confirm changes"
  actions={
    <>
      <AppButton color="secondary" variant="outlined" onClick={() => setOpen(false)}>Cancel</AppButton>
      <AppButton color="primary" variant="contained" onClick={handleConfirm}>Confirm</AppButton>
    </>
  }
>
  {/* content */}
</AppDialog>
```

```tsx
// Darker backdrop, wider dialog
<AppDialog open={open} onClose={() => setOpen(false)} title="Settings" maxWidth="md" darkerBackdrop>
  {/* content */}
</AppDialog>
```

## Composition

Uses `AppTypography` and `StackColumn` internally for the title block. `AppDialogWithFeatures`
wraps this component (composition, not inheritance) to add search/pagination/loading — see
`app-dialog-with-features.md`.

## Anti-patterns

- **Passing both `title` and `description` as falsy but expecting an empty `DialogTitle` to still
  render (e.g. for consistent spacing).** The whole title block is conditionally skipped when
  both are falsy — add your own spacing in `children` if needed.
- **Overriding `dialogContentProps` when you specifically need `AppDialogWithFeatures`'s search/
  pagination/loading behavior.** Use `AppDialogWithFeatures` for that instead of trying to
  replicate it on top of plain `AppDialog`.
- **Forgetting `onClose`.** Like MUI's own `Dialog`, omitting `onClose` means the dialog can't be
  dismissed via backdrop click or Escape — always provide it unless that's intentional.
