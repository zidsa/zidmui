---
name: verify-feedback-overlays
description: Verify the zidmui feedback-overlays group (alert, dialog, dialog with features, tooltip) in a real browser. Every story renders in light and dark with no console error, and every journey in flows/ passes. Use after changing any of components/app-alert, components/app-dialog, components/app-dialog-with-features, components/app-tooltip, before a PR opens.
---

# Verify feedback-overlays

Modules: `src/components/app-alert`, `src/components/app-dialog`, `src/components/app-dialog-with-features`, `src/components/app-tooltip`.

## Run

```bash
.agents/skills/verify-zidmui/scripts/verify.sh feedback-overlays
```

It starts an isolated Storybook when none is running (`verify-zidmui/scripts/sb.sh`), then:

1. smoke: every story under the prefixes in `stories.txt` (7 prefixes) renders in light and dark with a filled root and no unexplained console error;
2. flows: each `flows/*.json` journey runs through `drive.mjs --flow --strict-console 1`, with ARIA snapshots before and after: `alert-close-buttons`, `dialog-open-close`, `dialog-with-features-pagination`, `tooltip-hover`.

Exit 0 means all passed. Exit 1 means a story or flow failed, 3 a tool error. Proof lands in `.verify-zidmui/verify/<utc>/`.

## Recorded findings

- none

## Maintain

A new story gets its prefix in `stories.txt` (`verify.sh all` runs `coverage.mjs`, which fails on a story no group prefix covers and on a prefix that matches no story). A new user-facing behaviour gets a flow: `{"story", "globals?", "steps"}` with the ops in the `verify-zidmui` step table (`click`, `type`, `fill`, `press`, `wheel`, `hover`, `focus`, `wait`, `expect`, `expectGone`, `expectAttr`, `expectValue`, `expectChecked`, `expectDisabled`, `expectCount`, `expectStyle`, `expectHtmlAttr`, `shot`, `aria`); every flow has at least one `expect*` step. The formal side is `formal-feedback-overlays`.
