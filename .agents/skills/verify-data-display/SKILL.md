---
name: verify-data-display
description: Verify the zidmui data-display group (accordion, card, empty state, icon box, icon with tooltip, overflown text, status chip, typography) in a real browser. Every story renders in light and dark with no console error, and every journey in flows/ passes. Use after changing any of components/app-accordion, components/app-card, components/app-empty-state, components/app-icon-box, components/app-icon-with-tooltip, components/app-overflown-text-with-tooltip and the rest of the group, before a PR opens.
---

# Verify data-display

Modules: `src/components/app-accordion`, `src/components/app-card`, `src/components/app-empty-state`, `src/components/app-icon-box`, `src/components/app-icon-with-tooltip`, `src/components/app-overflown-text-with-tooltip`, `src/components/app-status`, `src/components/app-typography`.

## Run

```bash
.agents/skills/verify-zidmui/scripts/verify.sh data-display
```

It starts an isolated Storybook when none is running (`verify-zidmui/scripts/sb.sh`), then:

1. smoke: every story under the prefixes in `stories.txt` (11 prefixes) renders in light and dark with a filled root and no unexplained console error;
2. flows: each `flows/*.json` journey runs through `drive.mjs --flow --strict-console 1`, with ARIA snapshots before and after: `accordion-disabled`, `accordion-expand-collapse`, `card-actions`, `empty-state-actions`, `status-variants-dark`, `typography-arabic-rtl`.

Exit 0 means all passed. Exit 1 means a story or flow failed, 3 a tool error. Proof lands in `.verify-zidmui/verify/<utc>/`.

## Recorded findings

- `react-app-accordion--with-action-buttons`: accordion-button-in-summary-button (known-findings.tsv; smoke fails when it stops reproducing, so a fix drops the row)
- `react-app-accordion--with-delete-action`: accordion-button-in-summary-button (known-findings.tsv; smoke fails when it stops reproducing, so a fix drops the row)

## Maintain

A new story gets its prefix in `stories.txt` (`verify.sh all` runs `coverage.mjs`, which fails on a story no group prefix covers and on a prefix that matches no story). A new user-facing behaviour gets a flow: `{"story", "globals?", "steps"}` with the ops in the `verify-zidmui` step table (`click`, `type`, `fill`, `press`, `wheel`, `hover`, `focus`, `wait`, `expect`, `expectGone`, `expectAttr`, `expectValue`, `expectChecked`, `expectDisabled`, `expectCount`, `expectStyle`, `expectHtmlAttr`, `shot`, `aria`); every flow has at least one `expect*` step. The formal side is `formal-data-display`.
