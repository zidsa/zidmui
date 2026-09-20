# StackRow / StackColumn

Flex layout primitives built on MUI's `Stack`, with `spacing` disabled in favor of `gap`. Use
these instead of MUI's `Stack` directly, or instead of manually configuring `Box` with
`display="flex"`.

## Import

```tsx
import { StackRow } from '@zidsa/zidmui/components/stack-row';
import type { StackRowProps } from '@zidsa/zidmui/components/stack-row';

import { StackColumn } from '@zidsa/zidmui/components/stack-column';
import type { StackColumnProps } from '@zidsa/zidmui/components/stack-column';
```

## Props

Both: `Omit<StackProps, 'spacing'> & { ref?: React.Ref<HTMLDivElement> }`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `spacing` | — | — | **Omitted from both.** Use `gap` instead for spacing between children. |
| `direction` | inherited | `StackRow`: `'row'` (hardcoded); `StackColumn`: `'column'` (hardcoded) | Both hardcode `direction` as a default — overridable via props if you really need to flip it, but at that point use the other component instead. |
| `alignItems` | inherited | `StackRow`: `'center'` (hardcoded default); `StackColumn`: none | `StackColumn` does not default `alignItems` — children stretch to full width by default (standard flex-column behavior). |
| `gap`, `justifyContent`, `flexWrap`, `sx`, `children`, ... | inherited from `StackProps` | — | Pass through as-is. |

## Usage examples

```tsx
<StackRow gap={1} alignItems="center">
  <IconStarLine />
  <AppTypography variant="body2">4.8 rating</AppTypography>
</StackRow>
```

```tsx
<StackColumn gap={2}>
  <AppTypography variant="h6">Section title</AppTypography>
  <AppTypography variant="body2">Section description</AppTypography>
</StackColumn>
```

```tsx
// Nesting a row inside a column
<StackColumn gap={2}>
  <StackRow gap={1} justifyContent="space-between">
    <AppTypography variant="body2">Subtotal</AppTypography>
    <AppTypography variant="body2">$42.00</AppTypography>
  </StackRow>
  <StackRow gap={1} justifyContent="space-between">
    <AppTypography variant="body2">Total</AppTypography>
    <AppTypography variant="body2">$45.00</AppTypography>
  </StackRow>
</StackColumn>
```

## Composition

Used pervasively as the layout primitive inside nearly every other zidmui component (`AppCard`,
`AppAlert`, `AppDialog`, `AppAccordion`, `AppListItem`, `AppTabs`, etc.). When building custom
layouts alongside zidmui components, prefer `StackRow`/`StackColumn` over MUI's `Stack`/`Box` for
consistency, and use `gap` rather than nested margins for spacing.

## Anti-patterns

- **Passing `spacing`.** It's omitted from the type — use `gap` instead. `spacing` is forced to
  `0` internally regardless.
- **Using `StackRow`/`StackColumn` with `direction` overridden to the opposite axis.** If you
  need a column, use `StackColumn`, not `StackRow` with `direction="column"` — using the
  component matching your intended direction keeps the other hardcoded default
  (`alignItems="center"` for `StackRow`) from applying unexpectedly in the wrong context.
- **Using MUI's `Stack` directly for one-off layouts in a zidmui-based screen.** Prefer
  `StackRow`/`StackColumn` for consistency, even for simple cases.
