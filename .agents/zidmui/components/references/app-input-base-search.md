# AppInputBaseSearch

`AppInputBase` preconfigured as a search input — auto-generates an `id`, and hardcodes a search
icon as the start adornment. Use it for any search box instead of manually configuring
`AppInputBase` with a search icon each time.

## Import

```tsx
import { AppInputBaseSearch } from '@zidsa/zidmui/components/app-input-base-search';
import type { AppInputSearchProps } from '@zidsa/zidmui/components/app-input-base-search';
```

## Props

`AppInputSearchProps` = `TextFieldProps & { name: string, transformText?, iconButtonProps?, iconProps? }`

Note this extends raw MUI `TextFieldProps` directly (not `AppInputBaseProps`) — so at the type
level you cannot pass `AppInputBase`-specific props like `startAdornmentText`/`endAdornment`
(the underlying `startAdornment` is fixed to the search icon regardless).

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string` | — (required) | Also used to auto-generate the input's `id` as `"input-" + name`. |
| `transformText` | `(text: string) => string` | — | Same behavior as `AppInputBase`'s `transformText`. |
| `iconButtonProps` | `IconButtonProps` | — | **Declared in the type but not used** in the current implementation — has no visible effect. |
| `iconProps` | `SvgIconProps` | — | **Declared in the type but not used** in the current implementation — has no visible effect. |
| `label`, `placeholder`, `size`, `disabled`, `error`, `helperText`, ... | inherited from `TextFieldProps` | — | Pass through as-is. |

## Usage examples

```tsx
<AppInputBaseSearch name="productSearch" label="Search" placeholder="Search for products..." />
```

```tsx
// Controlled
const [query, setQuery] = useState('');

<AppInputBaseSearch
  name="search"
  placeholder="Search orders"
  value={query}
  onChange={(e) => setQuery(e.target.value)}
/>
```

## Composition

Wraps `AppInputBase`, fixing `startAdornment` to `IconSearchLine`. Used internally by
`AppDialogWithFeatures` for its built-in `search`/`onSearchChange` feature.

## Anti-patterns

- **Trying to customize the search icon via `iconProps`/`iconButtonProps`.** Neither is
  currently wired up in the implementation — they exist in the type but do nothing. If you need
  a different icon, use `AppInputBase` directly with your own `startAdornment`.
- **Trying to pass `AppInputBase`-only props like `startAdornmentText`, `endAdornment`, or
  `disableWheelNumberChange`.** They're not part of `AppInputSearchProps`'s type (it extends
  `TextFieldProps`, not `AppInputBaseProps`) — use `AppInputBase` directly if you need those.
