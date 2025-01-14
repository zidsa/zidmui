## Installation

This project uses pnpm as package manager, It's imperative to use pnpm to keep package lock consistent. Please make sure to install it first https://pnpm.io/installation.

Before installing project dependencies, you need to create [classic github personal token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token). Make sure your token have access to `read:packages`..

```sh
npm config set @zidsa:registry https://npm.pkg.github.com/
npm config set //npm.pkg.github.com/:_authToken ####
# replace #### with the token you generated on github
```

Install https://taskfile.dev/installation/ to run project tasks

```bash
$ task install
```

## Running the app

```bash
# run build
$ task build

# list all available tasks
$ task
```

## Test

```bash
# unit tests
$ task test
```

## Lint

```bash
# lint and fix any issues
$ task lint

# lint and and report any issues without fixing them
$ task lint-check
```
