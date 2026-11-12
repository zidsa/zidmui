# Pagination

`AppPagination` shows numbered page buttons with first, previous, next and last controls. The current page is marked, and the ends disable the controls that would go past them.

## Sub-features

- `pagination-page` jumps to a numbered page.
- `pagination-step` moves with previous and next.
- `pagination-ends` jumps with first and last, and disables them at the ends.
- `pagination-size` renders the small, medium and large sizes.

## How to get to it (user POV)

- Story `react-app-pagination--interactive`: 10 pages, starting on page 1, state wired to clicks.
- Stories `react-app-pagination--default`, `--size-medium`, `--size-large` render fixed pages.

## Driving it with drive.mjs

Preconditions:

- `sb.sh doctor` is all `ok`.

- **Start.** `{"expectAttr":{"role":"button","name":"page 1","attr":"aria-current","value":"page"}}`; `Go to first page` and `Go to previous page` are disabled (check with `{"expectAttr":{"role":"button","name":"Go to previous page","attr":"disabled","value":""}}`).
- **Jump.** `{"click":{"role":"button","name":"Go to page 3"}}` then `{"expectAttr":{"role":"button","name":"page 3","attr":"aria-current","value":"page"}}`.
- **Step.** `{"click":{"role":"button","name":"Go to next page"}}` then `page 4` is current.
- **Last.** `{"click":{"role":"button","name":"Go to last page"}}` then `page 10` is current and `Go to next page` is disabled.
- **Proof.** Bracket the steps with `aria` steps; run `drive --story react-app-pagination--interactive --steps @pagination.json`.

## Gotchas

- The current page's name drops the `Go to` prefix: it is `page 3`, while the others are `Go to page 3`. After a click, target the new name.
- Middle pages collapse into an ellipsis item, so `Go to page 6` does not exist from page 1. Reach it by stepping, or assert only on visible pages.
