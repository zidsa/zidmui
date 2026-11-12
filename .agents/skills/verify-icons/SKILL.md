---
name: verify-icons
description: Verify the zidmui icons group (all 21 icon categories (about 1,700 icon components) and their package exports) in a real browser. Every story renders in light and dark with no console error, and every journey in flows/ passes. Use after changing any of icons/arrows, icons/buildings, icons/business, icons/communication, icons/currencies, icons/design and the rest of the group, before a PR opens.
---

# Verify icons

Modules: `src/icons/arrows`, `src/icons/buildings`, `src/icons/business`, `src/icons/communication`, `src/icons/currencies`, `src/icons/design`, `src/icons/development`, `src/icons/device`, `src/icons/document`, `src/icons/editor`, `src/icons/finance`, `src/icons/food`, `src/icons/game-sports`, `src/icons/health-medical`, `src/icons/logos`, `src/icons/map`, `src/icons/media`, `src/icons/others`, `src/icons/system`, `src/icons/user-faces`, `src/icons/weather`.

## Run

```bash
.agents/skills/verify-zidmui/scripts/verify.sh icons
```

It starts an isolated Storybook when none is running (`verify-zidmui/scripts/sb.sh`), then:

1. smoke: every story under the prefixes in `stories.txt` (25 prefixes) renders in light and dark with a filled root and no unexplained console error;
2. flows: each `flows/*.json` journey runs through `drive.mjs --flow --strict-console 1`, with ARIA snapshots before and after: `icons-arrows`.

Exit 0 means all passed. Exit 1 means a story or flow failed, 3 a tool error. Proof lands in `.verify-zidmui/verify/<utc>/`.

## Recorded findings

- none

## Maintain

A new story gets its prefix in `stories.txt` (`verify.sh all` runs `coverage.mjs`, which fails on a story no group prefix covers and on a prefix that matches no story). A new user-facing behaviour gets a flow: `{"story", "globals?", "steps"}` with the ops in the `verify-zidmui` step table (`click`, `type`, `fill`, `press`, `wheel`, `hover`, `focus`, `wait`, `expect`, `expectGone`, `expectAttr`, `expectValue`, `expectChecked`, `expectDisabled`, `expectCount`, `expectStyle`, `expectHtmlAttr`, `shot`, `aria`); every flow has at least one `expect*` step. The formal side is `formal-icons`.
