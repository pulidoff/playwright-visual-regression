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
│   ├── homepage.spec.js
│   ├── products.spec.js
│   └── cart.spec.js
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

Full-page screenshots are avoided on pages that contain dynamic content (ads, rotating carousels, live product counts, session-dependent widgets). A single pixel difference anywhere on the page would fail the test even when the actual UI area under test is perfectly stable, producing noisy, unreliable suites.

Instead, each test targets the smallest stable DOM element that exercises the visual contract for that page:

| Page | Element tested | Rationale |
|------|---------------|-----------|
| Homepage | `nav` header | Constant across sessions; verifies branding and nav links |
| Homepage | Slider container | Bounded area; animation is paused by Playwright's headless mode |
| Homepage | Featured items section | Product grid layout; stable structure even if prices change slightly |
| Products | `.features_items` after search | Search results for a fixed query are deterministic |
| Cart | `#cart_info` | Self-contained table; no surrounding ads or recommendations |

The `waitFor({ state: 'visible' })` call before each screenshot ensures the target element has finished rendering before the comparison is made. The `maxDiffPixels: 200` tolerance absorbs minor sub-pixel rendering differences between OS versions without hiding real layout regressions.

## CI behavior

- Tests run on every push and pull request to `main`/`master`.
- On failure, the HTML report and `test-results/` (including diffs) are uploaded as artifacts and retained for 7 days.
- Retries: 2 on CI, 0 locally.
