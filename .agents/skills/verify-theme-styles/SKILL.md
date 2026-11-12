---
name: verify-theme-styles
description: Verify the zidmui theme-styles group (the MUI light/dark themes (src/theme) and the CSS design tokens (src/css)) in a real browser. Every story renders in light and dark with no console error, and every journey in flows/ passes. Use after changing any of styles, theme, before a PR opens.
---

# Verify theme-styles

Modules: `src/styles`, `src/theme`.

## Run

```bash
.agents/skills/verify-zidmui/scripts/verify.sh theme-styles
```

It starts an isolated Storybook when none is running (`verify-zidmui/scripts/sb.sh`), then:

1. smoke: every story under the prefixes in `stories.txt` (4 prefixes) renders in light and dark with a filled root and no unexplained console error;
2. flows: each `flows/*.json` journey runs through `drive.mjs --flow --strict-console 1`, with ARIA snapshots before and after: `colors-page`, `dark-theme-applies`.

Exit 0 means all passed. Exit 1 means a story or flow failed, 3 a tool error. Proof lands in `.verify-zidmui/verify/<utc>/`.

## Recorded findings

- `design-system-colors--all-colors`: colors-story-prop-leak (known-findings.tsv; smoke fails when it stops reproducing, so a fix drops the row)

## Maintain

A new story gets its prefix in `stories.txt` (`verify.sh all` runs `coverage.mjs`, which fails on a story no group prefix covers and on a prefix that matches no story). A new user-facing behaviour gets a flow: `{"story", "globals?", "steps"}` with the ops in the `verify-zidmui` step table (`click`, `type`, `fill`, `press`, `wheel`, `hover`, `focus`, `wait`, `expect`, `expectGone`, `expectAttr`, `expectValue`, `expectChecked`, `expectDisabled`, `expectCount`, `expectStyle`, `expectHtmlAttr`, `shot`, `aria`); every flow has at least one `expect*` step. The formal side is `formal-theme-styles`.
