---
name: verify-zidmui
description: Launch the zidmui Storybook (the @zidsa/zidmui component library's docs site) in an isolated instance, drive a component story in headless Chromium with Playwright, and capture screenshots, ARIA snapshots and a step transcript as proof. Use when you need to show that a zidmui component, theme or story behaves correctly in a real browser, after changing anything under src/components, src/hooks, src/theme, src/css or src/stories.
---

# Verify zidmui

zidmui is a React component library, not an app. A user touches it in two places:

- **Storybook** (primary, drivable): `pnpm storybook` serves every story. The public docs site is a static build of it (`wrangler.jsonc`). Verification drives single stories in Storybook's preview frame, `iframe.html?id=<story-id>`.
- **The npm package** (`dist/`): consumer apps import `@zidsa/zidmui/components/*`, `/icons/*`, `/theme/*`, `/hooks/*` and `/styles/*`. Prove it with the CI commands in [Package checks](#package-checks). No consumer app is wired up here.

Everything below runs from the repo root. The helpers are in `.claude/skills/verify-zidmui/scripts/`. In this file, `S=.claude/skills/verify-zidmui/scripts`.

## Prerequisites

- Node 22.14 or later, and Chromium for Playwright (`~/.cache/ms-playwright`). Playwright is **not** a repo dependency. `drive.mjs` loads `playwright` from the global npm root (`npm root -g`). Don't add it to `package.json`.
- pnpm: use the version pinned in `package.json` `packageManager`, run as `npx -y pnpm@<version>`. Global pnpm 10.0.0 fails on this repo with `packages field missing or empty`, because `pnpm-workspace.yaml` holds only settings. `sb.sh` already does this.

## Launch

```bash
$S/sb.sh launch                      # port 6116; another port: ZIDMUI_SB_PORT=6120 $S/sb.sh launch
```

What it does:

1. Installs dependencies if `node_modules` is missing (`pnpm install --frozen-lockfile`).
2. Starts `storybook dev -p <port> --ci --no-open --host 127.0.0.1` under `setsid`. The PID (which is also the process group) goes to `.verify-zidmui/run/<port>/pid`, the log to `.verify-zidmui/run/<port>/storybook.log`.
3. Waits for the log line `… for manager and … for preview` and a non-empty `/index.json`.
4. Renders `react-app-button--primary` headlessly. The first render triggers Vite's dependency optimisation, so a 200 from `/index.json` alone does not mean usable.

It is ready when it prints `ready: http://127.0.0.1:<port> (N stories)`. That takes about 15 s warm, longer on a first install. Storybook has no data dir, migrations or seed data. Stories are the fixtures.

Isolation: one instance per port. Launch refuses a port that is already listening, and refuses a second launch on a port this skill already owns. Don't use 6006: that is `pnpm storybook`'s default, and a human or another agent may be on it. Several instances on different ports can run side by side from one checkout.

## Doctor

Read-only. Run it first, and again whenever something looks off:

```bash
$S/sb.sh doctor
```

Every line must be `ok`:

- the recorded PID is alive
- the process listening on the port is in our process group, so we are not driving someone else's Storybook
- `/index.json` lists stories (213 at the time of writing)
- a story renders

The `info` line gives the git HEAD that Storybook is serving, and whether there are uncommitted changes. Storybook serves the working tree live, so edits hot-reload without a relaunch.

## Drive

`drive.mjs` opens one story in headless Chromium, runs JSON steps, and fails (exit 1) on the first step that does not hold:

```bash
node $S/drive.mjs --story <story-id> [--port 6116] [--args 'k:v;k:v'] [--globals 'theme:dark'] \
  --steps '<json array>'   # or --steps @steps.json
  [--out <dir>]            # default .verify-zidmui/evidence/<timestamp>-<story-id>/
```

- **Story IDs.** List them with `curl -s 127.0.0.1:6116/index.json | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>Object.values(JSON.parse(s).entries).filter(e=>e.type==="story").forEach(e=>console.log(e.id)))'`. The pattern is `<title-kebab>--<export-kebab>`, for example `React/App Dialog` + `WithActions` gives `react-app-dialog--with-actions`.
- **`--args`** overrides story args through the URL. Storybook only accepts args that have an `argTypes` entry in the story's meta. Others, such as `type` on App Input Base, are **silently dropped**.
- **`--globals theme:dark|light`** switches the Parcel theme. This is the same toolbar global the docs site uses.

Steps are objects with one key each. A target is `{"role","name"}` (accessible role and exact accessible name), `{"label"}` (form label), or `{"text"}`.

| Step | Example | Meaning |
| --- | --- | --- |
| `click` | `{"click":{"role":"button","name":"Open Dialog"}}` | Real mouse click. |
| `type` | `{"type":{"label":"Label","value":"abc"}}` | Types key by key, like a user. |
| `fill` | `{"fill":{"label":"Label","value":"abc"}}` | Replaces the value in one go. |
| `press` | `{"press":"Escape"}` | Keyboard key. |
| `wheel` | `{"wheel":{"label":"Amount","deltaY":-100}}` | Focus, hover, scroll the wheel. |
| `expect` | `{"expect":{"role":"dialog","name":"…","state":"hidden"}}` | Waits up to 5 s for `visible` (the default) or `hidden`. |
| `expectAttr` | `{"expectAttr":{"role":"tab","name":"All 120","attr":"aria-selected","value":"true"}}` | Exact attribute value. |
| `expectValue` | `{"expectValue":{"label":"Label","value":"abc"}}` | Exact input value. |
| `expectHtmlAttr` | `{"expectHtmlAttr":{"attr":"data-theme","value":"dark"}}` | Attribute on `<html>`. |
| `shot` / `aria` | `{"shot":"open"}`, `{"aria":"open"}` | Screenshot, or ARIA snapshot (YAML) of the page. |

To find names, run an `aria` step first and read the `.aria.yml` file. Names are exact accessible names, which are often longer than the visible label. A tab with a chip is `"All 120"`, and a dialog with a description is named title plus description. Prefer role and name over CSS classes. MUI class names are not a stable interface.

Per-feature recipes, with real story IDs, steps and gotchas, are in [features/README.md](features/README.md). Use them, and drive every entry point a feature file lists.

## Evidence

Each `drive.mjs` run with `--steps` or `--out` writes to `.verify-zidmui/evidence/<UTC timestamp>-<story-id>/`:

- `00-initial.png` before any step, `NN-final.png` after the last one, or `NN-failure.png` at the failing step
- any `NN-<name>.png` / `NN-<name>.aria.yml` that you asked for with `shot` / `aria`
- `transcript.json`: URL, every step with its timestamp and result (or error), and all browser console errors and page errors

Cleanup moves the Storybook log to `.verify-zidmui/evidence/storybook-<port>-<timestamp>.log`. `.verify-zidmui/` is gitignored. Evidence there survives cleanup, so point at it in a PR or hand-off.

Proof standards:

- Drive the story the way a user would: click, type, press. Don't call component setters or edit args mid-run to fake a state.
- Capture the action and the resulting state: an `aria` or `shot` before and after, plus an `expect*` step that asserts the change, such as `aria-selected`, `aria-current`, dialog hidden or input value.
- Treat a non-empty `consoleErrors` in the transcript as a finding, even when every step passed.
- Every assertion needs a case where it could have failed. Before trusting a "nothing changed" check (for example, wheel does not change a number), show the same step changing the value when the guard is off. Otherwise the step proves nothing.
- Stories are the only fixtures. If no story reaches a state, report the journey as unreachable and say why. Don't use a different component and call it proof.

## Cleanup

```bash
$S/sb.sh cleanup        # ZIDMUI_SB_PORT=<port> for a non-default port
```

Cleanup kills only the processes in the process group recorded in `.verify-zidmui/run/<port>/pid`, never by name. It moves the log into the evidence directory, removes the run directory, and fails if the port is still listening. It never touches `.verify-zidmui/evidence/`. Run it after every attempt, including failed ones.

## Package checks

These are the consumer-facing surface, and the same three steps CI runs (`.github/workflows/run-tests.yml`). There is no test suite.

```bash
npx -y pnpm@10.33.4 run lint-check   # "Found 0 warnings and 0 errors."
npx -y pnpm@10.33.4 run tscheck      # exit 0
npx -y pnpm@10.33.4 run build        # "✓ built in …"; writes dist/react/{es,cjs,types}, dist/styles, dist/illustrations, dist/logos
```

A component change that passes in Storybook but breaks `build` (for example, a type error in `.d.ts` emission) is not verified.
