
# Using @zidsa/zidmui icons

This skill teaches an AI agent how to find and import icons from `@zidsa/zidmui`, a React
component library built on MUI v7, in a **consumer project** (a project that has installed
`@zidsa/zidmui` as a dependency — this is not the zidmui library's own source repo).

## When to load this skill

Load this skill whenever the task involves adding or changing an icon in a project that
depends on `@zidsa/zidmui` (check `package.json` dependencies, or look for imports like
`@zidsa/zidmui/icons/*`).

## Core fact: icons are per-file exports, not a single icon set

There is no `Icon` component that takes a `name` prop, and no single barrel file listing every
icon. Each icon is its own component, exported from its own subpath, grouped into 21 categories
(`arrows`, `buildings`, `business`, `communication`, `currencies`, `design`, `development`,
`device`, `document`, `editor`, `finance`, `food`, `game-sports`, `health-medical`, `logos`,
`map`, `media`, `others`, `system`, `user-faces`, `weather`).

```tsx
import { IconStore2Line } from '@zidsa/zidmui/icons/buildings/store-2-line';

<IconStore2Line sx={{ fontSize: 20 }} />
```

The import subpath (`icons/<category>/<kebab-case-name>`) and the exported component name
(`Icon` + PascalCase of the file name) always follow this pattern — do not guess either half
from memory.

## Finding the right icon

1. Open `references/icons.md` for the category list and icon counts.
2. Open the specific category file, e.g. `references/icons/buildings.md`, to see every icon
   name and its exact import statement in that category.
3. Pick the icon whose name matches the concept needed and copy its import line verbatim —
   don't hand-construct the subpath or component name.

If it's unclear which category an icon belongs to, check a few likely categories (e.g. a
payment-related icon could be in `finance`, `business`, or `system`) rather than assuming.

## Verifying against the installed version

`references/icons.md` and the per-category files are a **generated snapshot** and can drift
from the version of `@zidsa/zidmui` actually installed in the consumer project (icons are
added, renamed, or removed across releases). If an import fails to resolve or an icon you
expect isn't listed:

- Check the installed package's types directly:
  `node_modules/@zidsa/zidmui/dist/react/types/icons/<category>/`
- If the reference docs are stale, regenerate them (see the zidmui repo's
  `tools/generate-zidmui-icons-catalog.ts` — only relevant if you're working inside the zidmui
  library repo itself, not a consumer project).

## Anti-patterns

- **Don't import an icon from `@mui/icons-material` when a zidmui equivalent exists.** Search
  the category files first; zidmui icons match the product's visual language and MUI's do not.
- **Don't assume every icon has both a `-line` and `-fill`/`-bold` variant.** Check the category
  file for the exact variants that exist before referencing one.
- **Don't import from a barrel or category-root path** (e.g. `@zidsa/zidmui/icons/system`) —
  each icon has its own subpath ending in the icon's kebab-case name.
