# Tabs

`AppTabs` renders a tab list where each tab can carry a chip (a count) or an icon. Choosing a tab selects it and deselects the previous one.

## Sub-features

- `tabs-click` selects a tab with the mouse.
- `tabs-keyboard` moves focus with the arrow keys and selects with Enter.
- `tabs-chip` shows a count chip in the tab name.
- `tabs-icon` shows an icon with or without a chip.

## How to get to it (user POV)

- Story `react-app-tabs--interactive`: tabs `All 120`, `Active 85`, `Pending 25`, with state wired to clicks.
- Stories `react-app-tabs--with-chip`, `--with-icon`, `--with-icon-and-chip`, `--using-children`, `--default` render fixed selections.

## Driving it with drive.mjs

Preconditions:

- `sb.sh doctor` is all `ok`.

- **Initial.** `{"expectAttr":{"role":"tab","name":"All 120","attr":"aria-selected","value":"true"}}`.
- **Click.** `{"click":{"role":"tab","name":"Active 85"}}` then `{"expectAttr":{"role":"tab","name":"Active 85","attr":"aria-selected","value":"true"}}` and the same on `All 120` with `"false"`.
- **Keyboard.** With `Active 85` focused after the click, `{"press":"ArrowRight"}` leaves `Pending 25` at `aria-selected` `"false"` (focus only); `{"press":"Enter"}` then makes it `"true"`.
- **Proof.** Add `{"aria":"before"}` first and `{"aria":"after"}` last; run `drive --story react-app-tabs--interactive --steps @tabs.json`.

## Gotchas

- Tab names include the chip text: `All 120`, not `All`.
- Arrow keys move focus but do not select (MUI's default `selectionFollowsFocus` is off). Asserting selection right after `ArrowRight` fails; press Enter or Space first.
- Only `--interactive` changes selection. The other stories have a fixed `value` arg, so a click there does nothing and proves nothing.
