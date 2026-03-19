import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { loadFixture } from '../utils/fixtureLoader.js';

const navFixture = loadFixture<{
  expectedNavLabels: string[];
  navItemsMinCount: number;
}>('navigation');

test.describe('Navigation & Layout @smoke @regression', () => {
  test('top navigation menu displays with expected options', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    await page.getByText(/email|password|log in|sign up/i).first().waitFor({ state: 'visible', timeout: 15000 });

    const allText = await page.locator('body').innerText();
    const hasExpectedNav = navFixture.expectedNavLabels.some((expected) =>
      allText.toLowerCase().includes(expected.toLowerCase())
    );
    expect(hasExpectedNav).toBe(true);
  });

  test('navigation items are functional and link to destinations', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    await page.waitForLoadState('domcontentloaded');

    const links = page.locator('a[href]');
    const count = await links.count();
    let validLinks = 0;
    for (let i = 0; i < count; i++) {
      const href = await links.nth(i).getAttribute('href');
      if (href && (href.startsWith('http') || href.startsWith('/'))) validLinks++;
    }
    expect(validLinks).toBeGreaterThanOrEqual(navFixture.navItemsMinCount);
  });
});
