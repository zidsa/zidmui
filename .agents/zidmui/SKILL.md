
# @zidsa/zidmui

`@zidsa/zidmui` is a React component library built on MUI v7, providing zid-branded
components, icons, hooks, and theme utilities. This is the entry point for AI agents working
in a **consumer project** — a project that has `@zidsa/zidmui` installed as a dependency (not
the zidmui library's own source repo).

## When to load this skill

Load this skill whenever the current project depends on `@zidsa/zidmui` (check `package.json`,
or look for imports starting with `@zidsa/zidmui/`) and the task touches UI: adding, editing,
or reviewing components, icons, layout, or theming.

## Sub-skills

This skill is split by concern. Load the specific sub-skill(s) that match the task instead of
trying to hold everything in context at once.

| Sub-skill | File | Load it when the task involves... |
| --- | --- | --- |
| Components | `components/SKILL.md` | Using an `App*` component (buttons, dialogs, inputs, cards, tabs, etc.) or the `StackRow`/`StackColumn` layout primitives. |
| Icons | `icons/SKILL.md` | Adding or changing an icon (`@zidsa/zidmui/icons/*`). |

Most UI tasks need the components sub-skill; load the icons sub-skill in addition whenever the
component needs an icon prop (e.g. `AppButton`'s `startIcon`, `AppListItem`'s `icon`) or the
task is icon-only.

## Shared ground rules across all zidmui usage

- **Never guess a prop, import path, or component name from MUI docs or memory.** Every
  sub-skill has reference docs generated from (or checked against) the actual package types —
  open the matching reference file before writing code.
- **Reference docs are snapshots and can drift** from the version actually installed in the
  consumer project. When a prop, type, or icon doesn't behave as documented, cross-check
  `node_modules/@zidsa/zidmui/dist/react/types/` directly — the installed `.d.ts` always wins
  over a reference doc.
- **Peer dependencies**: `react`, `react-dom`, `@mui/material`, `@mui/lab`, `@emotion/styled`,
  and `use-debounce` are required in practice. Verify they're installed before using components.
- **Prefer zidmui over raw MUI** for any UI concept zidmui already covers (typography, icons,
  buttons, etc.) to keep visual language and theme conventions consistent within a project.
