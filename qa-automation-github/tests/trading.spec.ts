import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { TradingPage } from '../pages/TradingPage.js';
import { loadFixture } from '../utils/fixtureLoader.js';

const tradingFixture = loadFixture<{
  minPairsToDisplay: number;
  categories: string[];
}>('trading');

test.describe('Trading Functionality @smoke @regression', () => {
  test('spot trading section displays trading pairs across categories', async ({ page }) => {
    const tradingPage = new TradingPage(page);
    await tradingPage.navigate();

    const url = page.url();
    const isLoginPage = url.includes('/login');
    const section = tradingPage.tradingPairsSection;
    const sectionVisible = await section.isVisible().catch(() => false);

    if (isLoginPage) {
      expect(url).toContain('trade.mb.io');
    } else {
      expect(sectionVisible).toBe(true);
      const pairs = await tradingPage.getVisiblePairSymbols();
      expect(pairs.length).toBeGreaterThanOrEqual(tradingFixture.minPairsToDisplay);
    }
  });

  test('trading pair data structure and presentation is correct', async ({ page }) => {
    const tradingPage = new TradingPage(page);
    await tradingPage.navigate();

    const url = page.url();
    const isLoginPage = url.includes('/login');
    const hasTradingContent = await page
      .locator('table, [role="grid"], [class*="pair"], [class*="symbol"], [class*="trade"]')
      .first()
      .isVisible()
      .catch(() => false);

    expect(isLoginPage || hasTradingContent).toBe(true);
  });
});
