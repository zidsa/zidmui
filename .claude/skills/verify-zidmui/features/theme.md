# Theme

zidmui ships the Parcel theme in light and dark. Storybook switches it with the `theme` toolbar global, which sets `data-theme` on `<html>` (for the CSS styles) and swaps the MUI theme (for the React components).

## Sub-features

- `theme-light` is the default.
- `theme-dark` restyles both MUI components and CSS-class components.

## How to get to it (user POV)

- The theme toolbar button in the Storybook manager, or `&globals=theme:dark` in the story URL.
- Any story; `react-app-button--primary` and the `css-styles-components-*` stories show the change clearly.

## Driving it with drive.mjs

Preconditions:

- `sb.sh doctor` is all `ok`.

- **Dark.** `drive --story react-app-button--primary --globals theme:dark --steps '[{"expectHtmlAttr":{"attr":"data-theme","value":"dark"}},{"shot":"dark"}]'`.
- **Light.** The same with `theme:light` and `"value":"light"`.
- **Proof.** Compare the two `NN-*.png` screenshots: the page background and button colours must differ. The `data-theme` assertion alone only proves the decorator ran, not that a component restyled.

## Gotchas

- `data-theme` is set in a `useEffect`, so assert it with `expectHtmlAttr` (which waits), not on the first frame.
- A component that hardcodes colours passes the attribute check and still looks the same in both themes; only the screenshots catch it.
