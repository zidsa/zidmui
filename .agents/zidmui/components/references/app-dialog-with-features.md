# AppDialogWithFeatures

`AppDialog` composed with built-in search, pagination, and a loading state. Use it for dialogs
that list/select items (e.g. "choose a product" pickers) instead of AppDialog. It is a
**composition** on top of `AppDialog` (renders `<AppDialog>` internally), not an extension of it
via inheritance — `AppDialog`'s own title/description/actions behavior still applies unchanged.

## Import

```tsx
import { AppDialogWithFeatures } from '@zidsa/zidmui/components/app-dialog-with-features';
import type { AppDialogWithFeaturesProps } from '@zidsa/zidmui/components/app-dialog-with-features';
```

## Props

`AppDialogWithFeaturesProps` = `AppDialogProps & { open: boolean; onClose: () => void; search?; onSearchChange?; searchProps?; pagination?; isLoading?; contentProps?; children? }`

All of `AppDialog`'s props (title, description, actions, etc. — see `app-dialog.md`) are
available here too, since this type extends `AppDialogProps`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `open` | `boolean` | — (required — narrower than `AppDialogProps`'s inherited optional `open`) | |
| `onClose` | `() => void` | — (required — narrower than MUI's `DialogProps['onClose']`, which takes event/reason args) | Note the signature is simpler than MUI's own `onClose` — no event or reason argument. |
| `search` | `string` | — | Controlled search input value. Passing this (or `onSearchChange`) shows the built-in search box. |
| `onSearchChange` | `(value: string) => void` | — | Change handler for the search box. |
| `searchProps` | `AppInputSearchProps` | — | Extra props for the internal `AppInputBaseSearch`. |
| `pagination` | `AppPaginationProps` | — | If set, renders an `AppPagination` row at the bottom using `pagination.count`/`page`/`onChange`. |
| `isLoading` | `boolean` | — | If true, replaces the entire body (search box, children, pagination) with a centered `CircularProgress`. |
| `contentProps` | `StackProps` | — | Props for the scrollable content column wrapping `children` (default `maxHeight: 500px`, `overflow: auto`, `gap={2}`). |
| `children` | `React.ReactNode` | — | The list/content body — rendered inside the scrollable column, hidden while `isLoading`. |
| `dialogContentProps` | inherited from `AppDialogProps` | forced to `{ sx: { overflow: 'hidden' } } `internally | **If you also pass `dialogContentProps` yourself, it fully replaces this default rather than merging with it** — since it's set before `{...props}` in the JSX. Passing your own `dialogContentProps` without including `overflow: 'hidden'` may break the intended scroll layout. |
| `fullWidth` | inherited | forced to `true` | Also overridable via `{...props}` if you explicitly pass `fullWidth={false}`. |

## Usage examples

```tsx
const [open, setOpen] = useState(false);
const [search, setSearch] = useState('');

<AppDialogWithFeatures
  open={open}
  onClose={() => setOpen(false)}
  title="Select a product"
  search={search}
  onSearchChange={setSearch}
>
  {filteredProducts.map((p) => (
    <AppListItem key={p.id} textLabel={p.name} onClick={() => handleSelect(p)} />
  ))}
</AppDialogWithFeatures>
```

```tsx
// With pagination
<AppDialogWithFeatures
  open={open}
  onClose={() => setOpen(false)}
  title="Choose a customer"
  pagination={{ count: totalPages, page, onChange: (_, p) => setPage(p) }}
>
  {/* list */}
</AppDialogWithFeatures>
```

```tsx
// Loading state
<AppDialogWithFeatures open={open} onClose={() => setOpen(false)} title="Loading options" isLoading>
  {/* children ignored while isLoading */}
</AppDialogWithFeatures>
```

## Composition

Renders `AppDialog` internally (passing through `open`, `onClose`, `title`, and any other
`AppDialogProps` via `...props`), and internally uses `AppInputBaseSearch` (for `search`),
`AppPagination` (for `pagination`), `StackColumn`/`StackRow`, and MUI's `CircularProgress` (for
`isLoading`).

## Anti-patterns

- **Passing your own `dialogContentProps` and expecting it to merge with the built-in
  `overflow: 'hidden'` styling.** It replaces the default entirely — include
  `sx: { overflow: 'hidden' }` yourself if you override this prop, or the scrollable content
  area may overflow the dialog unexpectedly.
- **Passing an `onClose` that expects MUI's `(event, reason) => void` signature.** This
  component's `onClose` is `() => void` — no arguments. If you need the reason (e.g. to ignore
  backdrop clicks), use plain `AppDialog` instead.
- **Using this component for a dialog that doesn't need search, pagination, or a list-loading
  state.** For a simple confirm/info dialog, use `AppDialog` directly — `AppDialogWithFeatures`
  adds structural overhead (scroll container, feature props) that isn't needed there.
