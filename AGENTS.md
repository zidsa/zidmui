# AGENTS.md

Guidance for coding agents in this repository.

## Purpose

`@zidsa/zidmui`: Zid's shared React component library, built on MUI and the
Parcel design system. It ships components, icons, hooks, theme, styles,
illustrations and logos. It holds no business logic, routes or network calls.

## Stack

React 19 and MUI 7 (peer dependencies), TypeScript, Vite library build with
`vite-plugin-dts`, Storybook 10. Lint: oxlint. Format: Prettier. Package
manager: pnpm only (`preinstall` enforces it); Node 22.14 or later.

## Layout

- `src/components/`, `src/hooks/`, `src/icons/`, `src/theme/`: published code.
  `package.json` `exports` maps each folder to a public import path.
- `src/css/`, `src/illustrations/`, `src/logos/`: static assets copied to `dist/`.
- `src/stories/` and `.storybook/`: Storybook docs and previews.
- `.agents/zidmui/`: agent skills that teach consumer projects the component APIs.

## Commands

```bash
pnpm install --frozen-lockfile   # install, as CI does
pnpm run lint-check              # oxlint, no fixes
pnpm run tscheck                 # tsc --noEmit
pnpm run build                   # tsc + vite build into dist/
pnpm storybook                   # Storybook on port 6006
task --list                      # Taskfile tasks (taskfile.dist.yml)
```

There is no test suite. `CONTRIBUTING.md` mentions `task test`, but that task is
commented out. CI (`.github/workflows/run-tests.yml`) runs `lint-check`,
`tscheck` and `build` on every push.

Lefthook runs oxlint and `tsc` on staged files before commit, and commitlint
(Conventional Commits) on the message.

## Remote writes

- `pnpm release` and `task release` publish to npm, push a tag and create a
  GitHub release. Do not run them unless asked.
- `wrangler.jsonc` serves the built Storybook (`storybook-static/`) as a
  Cloudflare Worker. Deploying it changes the public docs site.

## Workflow

Base branch: `main`. PR template: `pull_request_template.md` at the repo root.
