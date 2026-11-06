# Feature: GitHub CI

> Issue: #9 · Status: complete

## Goal

As the developer of this Pokédex, I want every push to be checked automatically and red code kept out of `main`, so that `main` always passes lint, typecheck and tests.

## Acceptance criteria

This feature has no app UI, so each criterion is tested on GitHub, not on the phone.

**Workflow**

- [x] A push to any branch starts one workflow run, visible in the repo's Actions tab.
- [x] The run has one job, `checks`, on Node 22, which installs dependencies with `npm ci`.
- [x] The job runs lint (`npm run lint -- --max-warnings 0`), typecheck (`npm run typecheck`) and tests (`npm test`).
- [x] The first run on the feature branch is green, with no change to app code.
- [x] A PR into `main` shows the `checks` result for its latest commit.

**Failure reporting**

- [x] A commit with a lint error turns the run red.
- [x] A commit with a lint warning and no errors turns the run red.
- [x] A commit with a type error turns the run red.
- [x] A commit with a failing test turns the run red.
- [x] One commit that breaks all three shows all three steps as failed in a single run, so an earlier failure does not hide a later one.
- [x] If `npm ci` fails, the run is red and the three checks are skipped.

**Merge block on `main`**

- [x] Branch protection on `main` requires the `checks` status to pass.
- [x] The rule also applies to admins (`enforce_admins` is on).
- [x] A PR with a red `checks` cannot be merged, including by the repo owner.
- [x] A PR with `checks` still running cannot be merged.
- [x] A PR with a green `checks` can be merged.
- [x] A direct push to `main` of a commit that has not passed `checks` is rejected.

## Screens & UI

- Route(s): none. This feature does not change the app.
- Figma frame: none.
- Results appear on GitHub: the Actions tab, the commit status, and the checks box on a PR.

## Data

- Endpoint(s): none. The tests do not call PokeAPI, so a PokeAPI outage cannot fail CI.
- Query key(s): none.
- Fields used: none.
- Stored in SQLite: no.
- Secrets: none.

## States

- **Loading:** The run is queued or in progress. GitHub shows it as pending, and a PR into `main` cannot be merged yet.
- **Error:** A step failed, so the run is red and the PR stays blocked. The run's log shows which step failed. Fix it with a new push, which starts a new run. If the failure is not caused by the code, such as a GitHub or npm outage, use **Re-run jobs** on GitHub.
- **Empty:** If Jest finds no tests, it exits with an error and the run is red. A green run therefore always means tests ran.

## Code layout

- Workflow: `.github/workflows/ci.yml`
- UI, data and logic: no changes.
- Branch protection is a GitHub repo setting, not a file. Claude sets it with the `gh` CLI during `/build-issue`.

## Build order

1. Add the workflow on a feature branch and confirm it runs green.
2. Prove the failure criteria on throwaway branches, so broken code never sits on the feature branch.
3. Confirm with the user, then switch on branch protection. It changes live repo settings.
4. Test the merge block with throwaway PRs, then close them and delete their branches.
5. Merge the feature PR into `main`. This also proves that a green PR can merge.

## Workflow change for chat exports

With `enforce_admins` on, chat exports can no longer be pushed straight to `main`. They are committed on the feature branch before merging.

## Out of scope

- A separate `pull_request` trigger. Branch pushes already report their status on the PR.
- `expo-doctor` in CI.
- Separate jobs or required checks per step.
- Linting the `example/` folder. `expo lint` only covers its default directories, which include `src/`.
- Requiring branches to be up to date with `main` before merging.
- EAS builds, EAS updates, deploys and test coverage reports.
- A README status badge.

## Open questions

- None.
