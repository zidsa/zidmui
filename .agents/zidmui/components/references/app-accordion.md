# AppAccordion

An accordion built on MUI's `Accordion`/`AccordionSummary`/`AccordionDetails`, with structured
title/description slots, color variants, independent loading states for the summary and
details, and controlled/uncontrolled expand support. Use it for collapsible sections (FAQ
panels, settings groups, expandable detail rows).

## Import

```tsx
import { AppAccordion } from '@zidsa/zidmui/components/app-accordion';
import type { AppAccordionProps, AppAccordionColor, AppAccordionRoundedCorners } from '@zidsa/zidmui/components/app-accordion';
```

## Props

`AppAccordionProps` is a standalone object type. MUI's accordion prop types are exposed
indirectly via `accordionProps`/`accordionSummaryProps`/`detailsProps`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `isOpen` | `boolean` | — (uncontrolled if omitted) | If set, the accordion is **controlled** — pass this plus `onToggle`. If omitted, the accordion manages its own open state (use `accordionProps.defaultExpanded` for an uncontrolled initial state). |
| `onToggle` | `(event, expanded: boolean) => void` | — | Fires on expand/collapse (maps to MUI's `Accordion.onChange`). |
| `color` | `'primary' \| 'success' \| 'error' \| 'warning' \| 'info' \| 'neutral'` | — | Passed through as a `color` prop and a `data-color` attribute — relies on theme augmentation for the actual styling (not implemented inline in this component). |
| `disable` | `boolean` | — | Disables the accordion and dims the title/description text colors. |
| `roundedCorners` | `'grouped' \| 'all'` | `'all'` | Exposed as a `data-rounded-corners` attribute — actual corner styling comes from theme CSS targeting that attribute. |
| `accordionProps` | `Partial<AccordionProps>` | — | Extra props for the root `Accordion` (e.g. `defaultExpanded`, `sx`). |
| `accordionSummaryProps` | `Partial<AccordionSummaryProps>` | — | Extra props for `AccordionSummary`. |
| `unmountOnExit` | `boolean` | `true` | Whether collapsed content is unmounted from the DOM (passed to the collapse transition's `slotProps`). |
| `title` | `string \| React.ReactNode` | — | String titles render via `AppTypography` (`variant="subtitle1"`); non-string nodes render as-is. |
| `titleProps` | `AppTypographyProps` | — | Only applied when `title` is a string. |
| `titlePrefix` | `React.ReactNode` | — | Rendered before the title/description column. |
| `titleSuffix` | `React.ReactNode` | — | Rendered inline after a string `title` only. |
| `description` | `React.ReactNode` | — | Rendered via `AppTypography` (`variant="body2"`, dimmed further when `disable`). |
| `descriptionProps` | `AppTypographyProps` | — | Extra description typography props. |
| `isSummaryLoading` | `boolean` | — | Shows a loader in the summary row and hides the expand arrow icon. |
| `summaryLoader` | `React.ReactNode` | Zid logo spinner image (24px) | Custom summary loader. Passing `null` explicitly suppresses any loader (shows nothing instead of the default). |
| `summaryLoaderProps` | `StackRowProps` | — | Props for the row wrapping the summary loader. |
| `isDetailsLoading` | `boolean` | — | Replaces `children` in the details area with a loader. |
| `detailsLoader` | `React.ReactNode` | Zid logo spinner image (56px) | Custom details loader. Same `null`-suppresses-default behavior as `summaryLoader`. |
| `detailsProps` | `AccordionDetailsProps` | — | Extra props for `AccordionDetails`. |
| `detailsLoaderProps` | `StackRowProps` | — | Props for the row wrapping the details loader. |
| `children` | `React.ReactNode` | — | Main details content — hidden while `isDetailsLoading`. |
| `sx` | `SxProps<Theme>` | — | Declared in the type but not read/used directly in the component body — pass visual overrides via `accordionProps.sx` instead. |

## Usage examples

```tsx
// Uncontrolled
<AppAccordion title="Shipping details" description="Estimated delivery: 3-5 days">
  <AppTypography variant="body2">Ships from our Riyadh warehouse.</AppTypography>
</AppAccordion>
```

```tsx
// Controlled
const [open, setOpen] = useState(false);

<AppAccordion
  isOpen={open}
  onToggle={(_, expanded) => setOpen(expanded)}
  title="Advanced settings"
>
  {/* content */}
</AppAccordion>
```

```tsx
// Loading details
<AppAccordion title="Order history" isDetailsLoading>
  {/* content is replaced by the loader while isDetailsLoading is true */}
</AppAccordion>
```

```tsx
// Disabled
<AppAccordion title="Locked section" disable>
  <AppTypography variant="body2">Unlock this by completing setup.</AppTypography>
</AppAccordion>
```

## Composition

Uses `AppTypography`, `StackRow`, `StackColumn` internally.

## Anti-patterns

- **Passing `sx` directly expecting it to style the accordion.** It's declared in the prop type
  but not wired up internally — use `accordionProps={{ sx: {...} }}` instead.
- **Mixing controlled and uncontrolled usage.** Passing `isOpen` without `onToggle` (or vice
  versa) will make the accordion appear stuck — if you set `isOpen`, always also handle
  `onToggle`; otherwise omit `isOpen` entirely and let it manage its own state.
- **Passing `summaryLoader={undefined}` to suppress the default loader.** `undefined` is
  treated as "use the default" — pass `null` explicitly if you want no loader shown at all while
  `isSummaryLoading`/`isDetailsLoading` is true.
