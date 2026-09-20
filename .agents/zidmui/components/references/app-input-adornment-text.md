# AppInputAdornmentText

A text adornment for text fields, built on MUI's `InputAdornment`, styled with themed typography
and an optional background pill. Rarely used standalone — usually reached via `AppInputBase`'s
`startAdornmentText`/`endAdornmentText` props rather than imported directly.

## Import

```tsx
import { AppInputAdornmentText } from '@zidsa/zidmui/components/app-input-adornment-text';
import type { AppInputAdornmentTextProps } from '@zidsa/zidmui/components/app-input-adornment-text';
```

## Props

`AppInputAdornmentTextProps` = `Omit<InputAdornmentProps, 'position'> & { typographyProps?, position?: 'start' | 'end', hideBackground? }`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `position` | `'start' \| 'end'` | `'start'` | Redeclared as **optional** (MUI's own `InputAdornmentProps.position` is required). |
| `typographyProps` | `AppTypographyProps` | — | Extra props for the inner `AppTypography` (defaults: `variant="body2"`, `color="text.tertiary"`). |
| `hideBackground` | `boolean` | — | If true, strips the default background/border styling (`background: 'transparent'`, `border: 'none'`), merged into `sx`. |
| `children` | `React.ReactNode` | — | The adornment text/content. |

## Usage examples

```tsx
// Rarely used directly — normally reached via AppInputBase
<AppInputAdornmentText position="start">SAR</AppInputAdornmentText>
```

```tsx
// Without the default background pill
<AppInputAdornmentText position="end" hideBackground>%</AppInputAdornmentText>
```

**Preferred usage — through `AppInputBase`:**

```tsx
<AppInputBase
  label="Price"
  startAdornmentText="SAR"
  endAdornmentTextProps={{ hideBackground: true }}
  endAdornmentText="/mo"
/>
```

## Composition

Used internally by `AppInputBase` for its `startAdornmentText`/`endAdornmentText` props. Use
`AppInputBase`'s props rather than composing `AppInputAdornmentText` manually inside a raw MUI
`TextField`, unless you're building a text field outside the `AppInputBase` wrapper entirely.

## Anti-patterns

- **Manually placing this inside MUI's `InputAdornment`-based slot props on a raw `TextField`**
  when `AppInputBase` is already in use. Use `AppInputBase`'s `startAdornmentText`/
  `endAdornmentText` instead — they wire this component up correctly, including merging with any
  other `slotProps.input` you pass.
- **Expecting `position` to matter for anything other than which side it renders relative to the
  input** — it doesn't control styling differences beyond MUI's own `InputAdornment` positioning.
