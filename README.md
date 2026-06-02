# Playwright Visual Regression — Automation Exercise

[![Playwright Tests](https://github.com/<your-org>/<your-repo>/actions/workflows/ci.yml/badge.svg)](https://github.com/<your-org>/<your-repo>/actions/workflows/ci.yml)

Visual regression test suite for [automationexercise.com](https://www.automationexercise.com) using Playwright and the Page Object Model pattern.

## Stack

| Tool | Purpose |
|------|---------|
| [Playwright](https://playwright.dev) | Browser automation & screenshot diffing |
| Node.js 20 | Runtime |
| GitHub Actions | CI/CD pipeline |
| POM Pattern | Test architecture |

## Project structure

```
playwright-visual-regression/
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions pipeline
├── pageobjects/
│   ├── POManager.js            # Central page object factory
│   ├── HomePage.js
│   ├── ProductsPage.js
│   └── CartPage.js
├── snapshots/                  # Baseline screenshots (committed)
├── tests/
│   └── homepage.spec.js
├── .gitignore
├── package.json
├── playwright.config.js
└── README.md
```

## Setup

```bash
npm install
npx playwright install chromium
```

## Commands

| Command | Description |
|---------|-------------|
| `npx playwright test` | Run all tests |
| `npx playwright test tests/homepage.spec.js` | Run a single spec |
| `npx playwright test --update-snapshots` | Regenerate baseline screenshots |
| `npx playwright show-report` | Open HTML report after a run |
| `npx playwright test --ui` | Open Playwright UI mode |

## Updating baselines

When intentional UI changes are made, regenerate the snapshots and commit them:

```bash
npx playwright test --update-snapshots
git add snapshots/
git commit -m "chore: update visual baselines"
```

## Snapshot baselines

Playwright names snapshots automatically by operating system:

| Platform | File pattern |
|----------|-------------|
| Windows (local) | `snapshots/**/*-chromium-win32.png` |
| Linux (CI) | `snapshots/**/*-chromium-linux.png` |

**First CI run:** when no Linux baselines exist the workflow runs `--update-snapshots`, commits only the new files (untracked by git), and re-runs the tests. The commit message includes `[skip ci]` to prevent a loop.

**Subsequent runs:** tests compare against the committed Linux baselines. If a test fails because of a real regression — not a missing file — no new baselines are committed and the build fails so the diff can be reviewed.

**Pull requests:** auto-generation only triggers on pushes to `main`/`master`. If a PR introduces new tests that need Linux baselines, merge to main first (or generate them locally and commit).

## Testing strategy

automationexercise.com serves third-party ads, rotating banners, live product counts, and session-dependent widgets throughout most of its pages. Any of these can change between runs and introduce pixel differences that have nothing to do with the UI under test, causing tests to fail non-deterministically.

To keep the suite reliable, only elements that are **100% static** across sessions and environments are tested. Currently that means a single element:

| Page | Element tested | Why it is stable |
|------|---------------|-----------------|
| Homepage | Navigation bar (`navBar`) | Pure static HTML — brand logo, nav links, and search bar never change based on session, ads, or server state |

Elements explicitly excluded and why:

| Element | Reason excluded |
|---------|----------------|
| Homepage slider | Rotates ad banners loaded dynamically; frame shown depends on timing |
| Homepage featured items | Product prices and stock badges update server-side |
| Products list / search results | Ad slots injected between product cards vary per request |
| Cart page | Surrounding layout contains recommendation widgets tied to session |

The `maxDiffPixels: 200` tolerance on the one remaining test absorbs minor sub-pixel rendering differences between operating systems (Windows local vs. Linux CI) without hiding real layout regressions.

## CI behavior

- Tests run on every push and pull request to `main`/`master`.
- On failure, the HTML report and `test-results/` (including diffs) are uploaded as artifacts and retained for 7 days.
- Retries: 2 on CI, 0 locally.
