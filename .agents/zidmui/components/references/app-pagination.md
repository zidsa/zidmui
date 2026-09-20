# AppPagination

A preconfigured MUI `Pagination` (outlined, rounded, with first/last buttons). Use it for any
paginated list/table instead of configuring MUI's `Pagination` from scratch each time.

## Import

```tsx
import { AppPagination } from '@zidsa/zidmui/components/app-pagination';
import type { AppPaginationProps } from '@zidsa/zidmui/components/app-pagination';
```

## Props

`AppPaginationProps` = `Omit<PaginationProps, 'variant' | 'color' | 'shape' | 'size'> & { size?: 'medium' | 'large' }`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `size` | `'medium' \| 'large'` | `'medium'` | Narrower than MUI's own size union (no `'small'`). |
| `variant` | — | `'outlined'` (hardcoded default) | **Omitted from the type** but still overridable, since the default is passed as a prop and `{...props}` is spread after it — if you need a different variant, check whether it's actually reachable given the Omit (it is not part of the public type, so TypeScript will reject passing it even though the runtime spread would technically accept it). |
| `shape` | — | `'rounded'` (hardcoded) | Same situation as `variant` — omitted from the type, not settable through normal TS usage. |
| `color` | — | not set (MUI default) | Omitted from the type. |
| `count`, `page`, `onChange`, `disabled`, `showFirstButton`, `showLastButton`, ... | inherited from `PaginationProps` | `showFirstButton`/`showLastButton` default to `true` here (MUI itself defaults both to `false`) | Pass through as-is; `showFirstButton`/`showLastButton` can be explicitly overridden back to `false`. |

## Usage examples

```tsx
<AppPagination count={10} page={page} onChange={(_, newPage) => setPage(newPage)} />
```

```tsx
// Large size
<AppPagination count={100} page={page} size="large" onChange={(_, newPage) => setPage(newPage)} />
```

```tsx
// Without first/last buttons
<AppPagination count={5} page={page} showFirstButton={false} showLastButton={false} onChange={(_, newPage) => setPage(newPage)} />
```

## Composition

Used inside `AppDialogWithFeatures`'s built-in pagination row (`pagination` prop there maps
directly to `count`/`page`/`onChange` on an internal `AppPagination`).

## Anti-patterns

- **Trying to pass `variant`, `shape`, or `color` to change the look.** They're omitted from the
  type (TypeScript will error). The visual style (`outlined`, `rounded`) is fixed by design —
  use `sx` for any visual tweaks the pagination component doesn't otherwise expose.
- **Expecting `showFirstButton`/`showLastButton` to default to `false` like plain MUI.** They
  default to `true` here — explicitly pass `false` if you don't want first/last jump buttons.
