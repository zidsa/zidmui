---
name: verify-hooks
description: Verify the zidmui hooks group (useToggle, useDebounceState, usePaginatedData, useCustomEventListener) in a real browser. Every story renders in light and dark with no console error, and every journey in flows/ passes. Use after changing any of hooks/use-custom-event-listener, hooks/use-debounce-state, hooks/use-paginated-data, hooks/use-toggle, before a PR opens.
---

# Verify hooks

Modules: `src/hooks/use-custom-event-listener`, `src/hooks/use-debounce-state`, `src/hooks/use-paginated-data`, `src/hooks/use-toggle`.

## Run

```bash
.agents/skills/verify-zidmui/scripts/verify.sh hooks
```

It starts an isolated Storybook when none is running (`verify-zidmui/scripts/sb.sh`), then:

1. smoke: every story under the prefixes in `stories.txt` (5 prefixes) renders in light and dark with a filled root and no unexplained console error;
2. flows: each `flows/*.json` journey runs through `drive.mjs --flow --strict-console 1`, with ARIA snapshots before and after: `paginated-dialog`, `toggle-controlled-accordion`.

Exit 0 means all passed. Exit 1 means a story or flow failed, 3 a tool error. Proof lands in `.verify-zidmui/verify/<utc>/`.

## Recorded findings

- none

## Maintain

A new story gets its prefix in `stories.txt` (`verify.sh all` runs `coverage.mjs`, which fails on a story no group prefix covers and on a prefix that matches no story). A new user-facing behaviour gets a flow: `{"story", "globals?", "steps"}` with the ops in the `verify-zidmui` step table (`click`, `type`, `fill`, `press`, `wheel`, `hover`, `focus`, `wait`, `expect`, `expectGone`, `expectAttr`, `expectValue`, `expectChecked`, `expectDisabled`, `expectCount`, `expectStyle`, `expectHtmlAttr`, `shot`, `aria`); every flow has at least one `expect*` step. The formal side is `formal-hooks`.
- `verify-zidmui-events` (maintained): TLA+ model and witness of `on`/`off`/`once`; `formal.sh hooks` runs it as `hooks/events` (recorded FINDINGs AtMostOnce, OnceKeepsOn, pinned exactly: the two `model: FAIL` and two `witness: FAIL` lines with exit 1; any other output fails, and a missing `tlc`/`sany` or a checker error is exit 3).
