# Using @zidsa/zidmui components

This skill teaches an AI agent how to correctly use components from `@zidsa/zidmui`, a React
component library built on MUI v7, in a **consumer project** (a project that has installed
`@zidsa/zidmui` as a dependency — this is not the zidmui library's own source repo).

## When to load this skill

Load this skill whenever the current project imports from `@zidsa/zidmui` (check
`package.json` dependencies, or look for imports like `@zidsa/zidmui/components/*`), and the
task involves adding, editing, or reviewing UI that uses zidmui components.

## Core fact: these are not drop-in MUI replacements

Every `App*` component wraps an MUI primitive but **restricts, renames, or extends** its props.
Do not assume an MUI prop name or value works unchanged on an `App*` component. Concretely:

- Prop unions are often narrower than MUI's (e.g. `AppButton`'s `color` only accepts
  `'primary' | 'secondary' | 'error' | 'tertiary' | 'primaryDark' | 'primaryLight'`, and specific
  `color` values only allow specific `variant` values — see `references/app-button.md`).
- Some MUI props are omitted entirely and replaced with a zid-specific equivalent (e.g.
  `AppInputBase` omits MUI's adornment slot props in favor of `startAdornmentText` /
  `endAdornmentText`; `AppTypography` omits `fontSize`/`fontWeight`/`fontStyle` in favor of
  `variant`).
- Some components render a completely different tree depending on props (e.g. `AppSwitch`
  renders a bare MUI `Switch` with no wrapper when `label` is not passed, but a
  `FormControlLabel`-wrapped `Switch` when it is).

**Always open the matching file in `references/` before writing code that uses a zidmui
component.** Do not guess prop names from MUI documentation or from memory of other component
libraries.

## Verifying against the installed version

The reference docs in this skill are a snapshot and can drift from the version of
`@zidsa/zidmui` actually installed in the consumer project. When exact prop types matter (a
type error, an unfamiliar prop, or anything safety/behavior critical), cross-check against the
installed package's type declarations:

```
node_modules/@zidsa/zidmui/dist/react/types/components/<component-name>.d.ts
```

For example, for `AppButton`, check
`node_modules/@zidsa/zidmui/dist/react/types/components/app-button.d.ts`. If the installed
`.d.ts` disagrees with a reference doc here, the `.d.ts` wins — it reflects the actual installed
version.

## Installation and peer dependencies

```sh
pnpm add @zidsa/zidmui
pnpm add react react-dom @mui/material @mui/lab @emotion/styled use-debounce
```

All of `react`, `react-dom`, `@mui/material`, `@mui/lab`, `@emotion/styled`, and `use-debounce`
are peer dependencies (optional peer deps, but required in practice for any project actually
using the components). If any of these are missing from the consumer project, install them
before using zidmui components.

## Import convention

Components are imported per-component from the `components` export subpath, not from a single
barrel import:

```tsx
import { AppButton } from '@zidsa/zidmui/components/app-button';
import { AppInputBase } from '@zidsa/zidmui/components/app-input-base';
```

The file name after `components/` matches the reference doc file name in this skill (kebab-case,
e.g. `app-button` → `references/app-button.md`).

## Global anti-patterns

- **Don't assume MUI's `color`/`variant` unions apply.** Many `App*` components restrict these
  to a specific set, sometimes with a discriminated union tying specific `color` values to
  specific allowed `variant` values (see `app-button.md`). Passing an unsupported combination is
  a type error in TypeScript, but if the consumer project doesn't type-check strictly, it can
  silently do the wrong thing.
- **Don't reach for MUI's raw adornment/slot APIs when a zid-specific prop exists for the same
  purpose** (e.g. use `startAdornmentText`/`endAdornmentText` on `AppInputBase` instead of
  building an `InputAdornment` manually — the zid version applies the correct typography and
  optional background styling automatically).
- **Don't import from `@mui/material` when a zidmui equivalent exists for the same UI concept**
  (e.g. use `AppTypography` instead of MUI's `Typography` in views that already use other zidmui
  components, so `tooltip` support and theme conventions stay consistent).
- **Don't assume a component's stated MUI base type means every MUI prop is honored.** A few
  components declare a broad extended type but only destructure and use a subset of it
  internally (see `app-radio-group.md`) — passing an unused-but-typed prop will not error but
  will silently do nothing.
- **Check for known-buggy props before relying on them.** A few components have documented
  quirks (see the Anti-patterns section in `app-switch-group.md` for one example). These are
  called out explicitly in the relevant reference doc.

## Component index

| Component                     | File                                            | Purpose                                                                              |
| ----------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------ |
| `AppAccordion`                | `references/app-accordion.md`                   | Expand/collapse panel with title, description, loaders, and color variants.          |
| `AppAlert`                    | `references/app-alert.md`                       | Inline alert/banner with title, content, link, actions, and loading state.           |
| `AppButton`                   | `references/app-button.md`                      | Primary button with a restricted color/variant matrix and optional tooltip.          |
| `AppCard`                     | `references/app-card.md`                        | Card container with header (title/description/prefix/suffix/action) and actions row. |
| `AppCheckbox`                 | `references/app-checkbox.md`                    | Labeled checkbox wrapping MUI `Checkbox` + `FormControlLabel`.                       |
| `AppDialog`                   | `references/app-dialog.md`                      | Modal dialog with title/description/content/actions slots.                           |
| `AppDialogWithFeatures`       | `references/app-dialog-with-features.md`        | `AppDialog` composed with built-in search, pagination, and loading UI.               |
| `AppEmptyState`               | `references/app-empty-state.md`                 | Empty/error/success state placeholder with icon, title, description, actions.        |
| `AppIconBox`                  | `references/app-icon-box.md`                    | Colored rounded box for wrapping a single icon.                                      |
| `AppIconButton`               | `references/app-icon-button.md`                 | Icon-only button with optional tooltip.                                              |
| `AppIconWithTooltip`          | `references/app-icon-with-tooltip.md`           | Small info icon with an accessible tooltip hit area (mobile-friendly).               |
| `AppInputAdornmentText`       | `references/app-input-adornment-text.md`        | Text adornment (prefix/suffix) for text fields, e.g. currency or unit labels.        |
| `AppInputBase`                | `references/app-input-base.md`                  | Base text field wrapper with adornment text helpers and number-input safety.         |
| `AppInputBaseSearch`          | `references/app-input-base-search.md`           | `AppInputBase` preconfigured as a search input with a search icon.                   |
| `AppInputRadio`               | `references/app-input-radio.md`                 | Radio group rendered from an `options` array with label/helper/error support.        |
| `AppInputRadioCard`           | `references/app-input-radio-card.md`            | Card-styled single radio option with label, description, icon, loading state.        |
| `AppListItem`                 | `references/app-list-item.md`                   | List item with icon, label (auto-truncated with tooltip), description, content.      |
| `AppOverflownTextWithTooltip` | `references/app-overflown-text-with-tooltip.md` | Text that shows a tooltip only when visually truncated.                              |
| `AppPagination`               | `references/app-pagination.md`                  | Preconfigured MUI pagination (outlined, rounded, first/last buttons).                |
| `AppRadioGroup`               | `references/app-radio-group.md`                 | Radio group rendered from an `options` array (simpler variant of `AppInputRadio`).   |
| `AppStatus`                   | `references/app-status.md`                      | Status chip with an optional tooltip.                                                |
| `AppSwitch`                   | `references/app-switch.md`                      | Single switch, optionally labeled; renders bare `Switch` when unlabeled.             |
| `AppSwitchGroup`              | `references/app-switch-group.md`                | Group of `AppSwitch` components rendered from an `options` array.                    |
| `AppTabs`                     | `references/app-tabs.md`                        | Tabs rendered from a `tabs` array or children, with icon/chip support per tab.       |
| `AppTooltip`                  | `references/app-tooltip.md`                     | Tooltip with a structured headline/description/content title.                        |
| `AppTypography`               | `references/app-typography.md`                  | Typography restricted to theme variants, with optional tooltip.                      |
| `StackRow` / `StackColumn`    | `references/stack.md`                           | Flex row/column layout primitives (use `gap`, not `spacing`).                        |
