MB.io
[QA Automation] Coding Challenge

This repo is my submission for the MB QA Automation coding challenge. It's a TypeScript test suite built around automating browser interactions and validating behavior end-to-end, with a GitHub Actions pipeline wired up to run everything on each push.

What's inside
mb/
├── .github/
│   └── workflows/          # CI runs here on every push
├── qa-automation-github/   # All the test code lives here
└── README.md


Getting started
You'll need Node.js v18+ and npm installed. Then:

git clone https://github.com/Wospdev/mb.git
cd mb/qa-automation-github

npm install

# Pull down the browser binaries Playwright needs
npx playwright install


Running the tests
# Run everything
npm test

# Run with a visible browser window (useful for debugging)
npm run test:headed

# Target a specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run a single test file
npx playwright test path/to/test.spec.ts

# Open the HTML report after a run
npx playwright show-report

Configuration
Test settings live in playwright.config.ts inside qa-automation-github. You can tweak the base URL, which browsers to run, timeouts, retry counts, and reporters from there.
For environment-specific stuff (base URLs, credentials, etc.), drop a .env file in the project root or pass them as environment variables before running.

CI
Every push to main triggers a GitHub Actions workflow that installs dependencies, spins up the browsers, runs the full suite, and uploads the test report as an artifact so you can dig into failures without re-running locally.

Stack

TypeScript — everything is typed
Playwright — handles the browser automation
GitHub Actions — keeps the tests running on every change
Node.js — runtime

About the challenge
The goal was to build a solid, maintainable E2E test suite from scratch. That meant structuring tests with the Page Object Model to keep things readable, making sure tests are reliable enough to trust in CI, and keeping the setup simple enough that anyone can clone and run it without headaches.

Author
Wosp
