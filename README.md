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

## CI behavior

- Tests run on every push and pull request to `main`/`master`.
- On failure, the HTML report and `test-results/` (including diffs) are uploaded as artifacts and retained for 7 days.
- Retries: 2 on CI, 0 locally.
