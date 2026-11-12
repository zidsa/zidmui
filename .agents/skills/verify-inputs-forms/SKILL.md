---
name: verify-inputs-forms
description: Verify the zidmui inputs-forms group (buttons, icon button, checkbox, input base, search input, adornment text, radio, radio card, radio group, switch, switch group) in a real browser. Every story renders in light and dark with no console error, and every journey in flows/ passes. Use after changing any of components/app-button, components/app-checkbox, components/app-icon-button, components/app-input-adornment-text, components/app-input-base, components/app-input-base-search and the rest of the group, before a PR opens.
---

# Verify inputs-forms

Modules: `src/components/app-button`, `src/components/app-checkbox`, `src/components/app-icon-button`, `src/components/app-input-adornment-text`, `src/components/app-input-base`, `src/components/app-input-base-search`, `src/components/app-input-radio`, `src/components/app-input-radio-card`, `src/components/app-radio-group`, `src/components/app-switch`, `src/components/app-switch-group`.

## Run

```bash
.agents/skills/verify-zidmui/scripts/verify.sh inputs-forms
```

It starts an isolated Storybook when none is running (`verify-zidmui/scripts/sb.sh`), then:

1. smoke: every story under the prefixes in `stories.txt` (17 prefixes) renders in light and dark with a filled root and no unexplained console error;
2. flows: each `flows/*.json` journey runs through `drive.mjs --flow --strict-console 1`, with ARIA snapshots before and after: `buttons-render`, `checkbox-toggle`, `input-base-type`, `radio-card-select`, `radio-group-keyboard`, `radio-select`, `search-type`, `switch-group-toggle`, `switch-toggle`.

Exit 0 means all passed. Exit 1 means a story or flow failed, 3 a tool error. Proof lands in `.verify-zidmui/verify/<utc>/`.

## Recorded findings

- none

## Maintain

A new story gets its prefix in `stories.txt` (`verify.sh all` runs `coverage.mjs`, which fails on a story no group prefix covers and on a prefix that matches no story). A new user-facing behaviour gets a flow: `{"story", "globals?", "steps"}` with the ops in the `verify-zidmui` step table (`click`, `type`, `fill`, `press`, `wheel`, `hover`, `focus`, `wait`, `expect`, `expectGone`, `expectAttr`, `expectValue`, `expectChecked`, `expectDisabled`, `expectCount`, `expectStyle`, `expectHtmlAttr`, `shot`, `aria`); every flow has at least one `expect*` step. The formal side is `formal-inputs-forms`.
