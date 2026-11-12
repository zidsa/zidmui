---
name: verify-navigation-layout
description: Verify the zidmui navigation-layout group (list item, pagination, tabs, StackRow, StackColumn) in a real browser. Every story renders in light and dark with no console error, and every journey in flows/ passes. Use after changing any of components/app-list-item, components/app-pagination, components/app-tabs, components/stack-column, components/stack-row, before a PR opens.
---

# Verify navigation-layout

Modules: `src/components/app-list-item`, `src/components/app-pagination`, `src/components/app-tabs`, `src/components/stack-column`, `src/components/stack-row`.

## Run

```bash
.agents/skills/verify-zidmui/scripts/verify.sh navigation-layout
```

It starts an isolated Storybook when none is running (`verify-zidmui/scripts/sb.sh`), then:

1. smoke: every story under the prefixes in `stories.txt` (6 prefixes) renders in light and dark with a filled root and no unexplained console error;
2. flows: each `flows/*.json` journey runs through `drive.mjs --flow --strict-console 1`, with ARIA snapshots before and after: `list-item`, `pagination-step`, `stack-layout`, `tabs-switch`.

Exit 0 means all passed. Exit 1 means a story or flow failed, 3 a tool error. Proof lands in `.verify-zidmui/verify/<utc>/`.

## Recorded findings

- `react-app-list-item--variants`: list-item-p-in-p (known-findings.tsv; smoke fails when it stops reproducing, so a fix drops the row)

## Maintain

A new story gets its prefix in `stories.txt` (`verify.sh all` runs `coverage.mjs`, which fails on a story no group prefix covers and on a prefix that matches no story). A new user-facing behaviour gets a flow: `{"story", "globals?", "steps"}` with the ops in the `verify-zidmui` step table (`click`, `type`, `fill`, `press`, `wheel`, `hover`, `focus`, `wait`, `expect`, `expectGone`, `expectAttr`, `expectValue`, `expectChecked`, `expectDisabled`, `expectCount`, `expectStyle`, `expectHtmlAttr`, `shot`, `aria`); every flow has at least one `expect*` step. The formal side is `formal-navigation-layout`.
