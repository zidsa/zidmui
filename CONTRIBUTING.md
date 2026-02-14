# Contributing to Zid MUI

Thank you for your interest in contributing to Zid MUI!

## Prerequisites

- [Node.js](https://nodejs.org/) >= 22.14.0
- [pnpm](https://pnpm.io/installation) >= 10.0.0
- [Taskfile](https://taskfile.dev/installation/)

This project uses pnpm as its package manager. It's imperative to use pnpm to keep the package lock consistent.

## Getting Started

Install dependencies:

```bash
task install
```

## Running the App

```bash
# run build
task build

# list all available tasks
task
```

## Storybook

```bash
# start storybook dev server
pnpm storybook

# build storybook
pnpm build-storybook
```

## Test

```bash
# unit tests
task test
```

## Lint

```bash
# lint and fix any issues
task lint

# lint and report any issues without fixing them
task lint-check
```

## Format

```bash
pnpm format
```
