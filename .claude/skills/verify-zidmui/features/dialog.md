# Dialog

`AppDialog` opens a modal with a title, an optional description, body content and action buttons. The user closes it with an action button, Escape, or a click on the backdrop, and focus returns to the page.

## Sub-features

- `dialog-open` opens the modal from a trigger button.
- `dialog-heading` names the dialog by its title and description.
- `dialog-actions` closes it from Cancel or Confirm.
- `dialog-escape` closes it with Escape.
- `dialog-backdrop` closes it from a backdrop click, including the darker backdrop variant.

## How to get to it (user POV)

- Story `react-app-dialog--with-actions`: choose `Open Dialog`; the dialog has `Cancel` and `Confirm`.
- Story `react-app-dialog--darker-backdrop`: choose `Open Dialog`; the dialog is titled `Darker Backdrop`.
- Stories `react-app-dialog--default`, `--with-title`, `--with-title-and-description` render the dialog through args.

## Driving it with drive.mjs

Preconditions:

- `sb.sh doctor` is all `ok`.

- **Closed at start.** `{"expect":{"role":"dialog","name":"Confirm Action Are you sure you want to proceed?","state":"hidden"}}`. No dialog is in the tree.
- **Open.** `{"click":{"role":"button","name":"Open Dialog"}}` then `{"expect":{"role":"dialog","name":"Confirm Action Are you sure you want to proceed?"}}` and `{"aria":"open"}`. The snapshot shows the heading, `This action cannot be undone.`, and buttons `Cancel` and `Confirm`.
- **Cancel.** `{"click":{"role":"button","name":"Cancel"}}` then the hidden `expect` again.
- **Escape.** Reopen, `{"press":"Escape"}`, then the hidden `expect`.
- **Confirm.** Reopen, `{"click":{"role":"button","name":"Confirm"}}`, then the hidden `expect`.
- **Proof run.** Put the steps in a file and run `drive --story react-app-dialog--with-actions --steps @dialog.json`. It prints `PASS` and an evidence directory with `NN-open.aria.yml` and screenshots.

## Gotchas

- The accessible name is title plus description: `Confirm Action Are you sure you want to proceed?`, not `Confirm Action`. An `expect` on the title alone times out.
- While the modal is open, MUI marks the rest of the page `aria-hidden`, so `Open Dialog` is not reachable by role until the dialog closes.
- The `Default` story's `open` arg is a control. Toggling it through `--args` is not a user path; prove opening through `Open Dialog`.
- The closing transition takes a moment; use `expect … "state":"hidden"`, which waits, rather than an `aria` step right after the click.
