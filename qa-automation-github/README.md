# QA Automation — MultiBank Trading Platform

Production-grade web automation framework for testing critical user flows on the [MultiBank trading platform](https://trade.multibank.io/).

## Architecture

- **Page Object Model (POM)** — `pages/` contains reusable page classes
- **Data-driven tests** — All assertions loaded from `fixtures/*.json` (no hard-coded values)
- **Cross-browser** — Chromium, Firefox, WebKit via Playwright
- **Explicit waits** — No fixed sleeps; Playwright auto-waits for actionability

### Project Structure

```
qa-automation/
├── pages/           # Page Object classes
├── tests/           # Test specs by feature
├── fixtures/        # External test data (JSON)
├── utils/           # Helpers, characterFrequency, fixture loader
├── config/          # Environment config
├── reports/         # Test output
├── .github/workflows/  # CI/CD
├── playwright.config.ts
├── package.json
└── README.md
```

## Setup

```bash
# Install dependencies
npm install

# Install Playwright browsers (first time)
npx playwright install
```

Copy `.env.example` to `.env` and adjust if needed:

```bash
cp .env.example .env
```

## Running Tests

| Command | Description |
|---------|-------------|
| `npm test` | Run all Playwright tests (all browsers) |
| `npm run test:smoke` | Run @smoke tests only |
| `npm run test:regression` | Run @regression tests only |
| `npm run test:chromium` | Run in Chromium only |
| `npm run test:firefox` | Run in Firefox only |
| `npm run test:webkit` | Run in WebKit only |
| `npm run test:unit` | Run Vitest unit tests (characterFrequency) |
| `npm run report` | Open HTML report |
| `npm run lint` | Run ESLint |

## Test Scenarios

1. **Navigation & Layout** — Top nav displays correctly, items functional
2. **Trading Functionality** — Spot trading pairs, data structure
3. **Content Validation** — Marketing banners, download links, About page

## Task 2: String Character Frequency

```ts
import { characterFrequency } from './utils/characterFrequency.js';
characterFrequency('hello world'); // "h:1, e:1, l:3, o:2, w:1, r:1, d:1"
```

**Assumptions:** Case-sensitive; whitespace excluded from output; special chars included.

## Assumptions & Trade-offs

- **Base URL:** `https://trade.mb.io` (trade.multibank.io redirects here)
- **About page path:** `/about/why-multilink` — adjust in `AboutPage.ts` if different
- **Selectors:** Flexible locators for resilience; update fixtures if UI changes
- **Character frequency:** Whitespace excluded to match challenge example

## Maintenance

- Update `fixtures/*.json` when expected nav labels, trading pairs, or content change
- Add new Page Objects in `pages/` for new flows
- Use `@smoke` / `@regression` tags for test categorization

## CI/CD

GitHub Actions workflow runs on push/PR to `main` or `master`:
- Unit tests
- Playwright tests (Chromium)
- Artifacts: `reports/` uploaded on failure
