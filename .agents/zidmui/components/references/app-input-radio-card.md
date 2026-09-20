# AppInputRadioCard

A single card-styled radio option, built on MUI's `FormControlLabel` + `Radio`, with label,
description, icon, and loading slots, and a CSS-only checked-state highlight (no JS state
needed). Use it inside a plain MUI `RadioGroup` (not `AppInputRadio`/`AppRadioGroup`) when you
want card-style selectable options instead of plain radio buttons.

## Import

```tsx
import { AppInputRadioCard } from '@zidsa/zidmui/components/app-input-radio-card';
import type { AppInputRadioCardProps } from '@zidsa/zidmui/components/app-input-radio-card';
```

## Props

`AppInputRadioCardProps` = `Omit<FormControlLabelProps, 'control' | 'label'> & { label: string | React.ReactNode; labelProps?, labelContainerProps?, labelIconContainerProps?, description?, descriptionProps?, radioProps?, isLoading?, labelSuffix?, icon? }`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string \| React.ReactNode` | — (required) | Card's primary label. String values render via `AppTypography` (`variant="body2"`) inside a row with `labelSuffix`; non-string nodes render as-is (raw, bypassing that row/typography wrapper). |
| `labelProps` | `AppTypographyProps` | — | Only applies when `label` is a string. |
| `labelContainerProps` | `StackProps` | — | Props for the outer column wrapping label + description. |
| `labelIconContainerProps` | `StackProps` | — | Declared in the type for the icon-adjacent container — check the installed `.d.ts`/source for exact wiring if the icon layout needs fine-tuning. |
| `description` | `React.ReactNode` | — | Rendered via a styled caption typography, clamped to 3 lines. |
| `descriptionProps` | `AppTypographyProps` | — | Extra description typography props. |
| `radioProps` | `RadioProps` | — | Extra props for the internal `Radio` (fixed to a 2.5-spacing square with no padding). |
| `isLoading` | `boolean` | — | Shows a `CircularProgress` absolutely centered over the card content. |
| `labelSuffix` | `React.ReactNode` | — | Rendered next to a string `label` (ignored for non-string labels). |
| `icon` | `React.ReactNode` | — | Rendered at the end of the card row, outside the label/description column. |
| `control`, `label` (base) | — | — | **Omitted** from `FormControlLabelProps` — `control` is fixed to a `Radio`, `label` is redeclared as required. |
| `value`, `name`, `disabled`, `checked`, ... | inherited from `FormControlLabelProps` | — | Standard radio option props (value is what identifies this option within the parent `RadioGroup`). |

Visual note: the "selected" highlight (background tint + border color) is done via a CSS
`:has(:checked)` selector — no controlled state is required for the highlight to appear, it
reacts to the actual DOM `checked` state of the inner radio input.

## Usage examples

```tsx
// Inside a plain MUI RadioGroup (not AppRadioGroup/AppInputRadio)
<RadioGroup name="plan" value={plan} onChange={(e) => setPlan(e.target.value)}>
  <AppInputRadioCard value="starter" label="Starter" description="For individuals getting started" />
  <AppInputRadioCard value="growth" label="Growth" description="For growing teams" icon={<IconStarLine />} />
</RadioGroup>
```

```tsx
// Loading state
<AppInputRadioCard value="pro" label="Pro" isLoading />
```

```tsx
// Disabled option
<AppInputRadioCard value="enterprise" label="Enterprise" disabled />
```

## Composition

Uses `AppTypography`, `StackColumn`, `StackRow` internally. Must be used as a child of an MUI
`RadioGroup` (or `AppInputRadio`'s/`AppRadioGroup`'s underlying group) — it is only the
individual option's card, not a full group component by itself.

## Anti-patterns

- **Using this as a standalone component without a parent `RadioGroup`.** It's an option, not a
  group — the "selected" checked-state styling and mutual exclusivity depend on the surrounding
  `RadioGroup`'s `name`/`value` wiring.
- **Passing a JSX node to `label` and expecting `labelSuffix` to render next to it.**
  `labelSuffix` is only composed alongside **string** labels — for a non-string `label`, build
  the suffix into your own JSX node instead.
- **Expecting `AppInputRadio`'s or `AppRadioGroup`'s `options` array to accept
  `AppInputRadioCard`-shaped items directly.** They don't — `AppInputRadioCard` is meant to be
  used as raw JSX children inside a plain `RadioGroup`, not passed through those other
  components' `options` prop.
