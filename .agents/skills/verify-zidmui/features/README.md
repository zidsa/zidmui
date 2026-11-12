# zidmui verification map

This directory is the maintained source for verifying zidmui components the way a consumer's user meets them: rendered in a browser, clicked, typed into. Read this index, then use the matching feature file as the recipe.

## Baseline preconditions

- A verification Storybook launched with `.claude/skills/verify-zidmui/scripts/sb.sh launch` (port 6116 unless `ZIDMUI_SB_PORT` says otherwise).
- `sb.sh doctor` prints only `ok` lines. Never drive a Storybook this skill did not start, including one on 6006.
- Stories are the only fixtures. There is no data dir or seed data.

## Driving conventions

- In every recipe, `S=.claude/skills/verify-zidmui/scripts`, and `drive` means `node $S/drive.mjs`.
- Each `drive` call loads the story fresh, so every recipe starts from the story's initial state.
- Target elements by role and exact accessible name (`{"role","name"}`) or form label (`{"label"}`). Run an `aria` step first if a name is unknown.
- Pass `--globals theme:dark` to repeat any recipe in the dark theme.

## Proof and skip reporting

- Capture the action and the resulting state: an `aria` step before and after, plus an `expect*` step that asserts the change.
- Keep the evidence directory that `drive` prints. It survives `sb.sh cleanup`.
- A non-empty `consoleErrors` in `transcript.json` is a finding, even when every step passed.
- If no story reaches a state, report the journey as unreachable and name the missing story. Do not prove it through a different component.

## Feature entry contract

Each feature file starts with an H1 title and one paragraph on the user-visible behavior, then exactly four H2 sections: `Sub-features`, `How to get to it (user POV)`, `Driving it with drive.mjs`, `Gotchas`.

## Features

- [Dialog](./dialog.md) covers opening, the title and description, and closing by Cancel, Confirm, Escape and backdrop.
- [Tabs](./tabs.md) covers switching tabs by click and keyboard, with chips and icons.
- [Pagination](./pagination.md) covers page buttons, first/previous/next/last, and the disabled ends.
- [Input base](./input-base.md) covers typing, labels, helper text, error and disabled states, and the number-input guards.
- [Theme](./theme.md) covers the Parcel light and dark themes.
