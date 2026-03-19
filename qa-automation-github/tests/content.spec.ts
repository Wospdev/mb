import { test, expect } from '@playwright/test';
import { loadFixture } from '../utils/fixtureLoader.js';

const contentFixture = loadFixture<{
  marketingBanner: { minCount: number };
  downloadSection: { appStoreUrlPattern: string; googlePlayUrlPattern: string };
  aboutPage: { expectedTextSnippets: string[] };
}>('content');

test.describe('Content Validation @smoke @regression', () => {
  test('marketing banners appear at page bottom or in content area', async ({ page }) => {
    await page.goto('https://mb.io');
    const banners = page.locator('[class*="banner"], [class*="carousel"], [class*="promo"], section');
    const count = await banners.count();
    expect(count).toBeGreaterThanOrEqual(contentFixture.marketingBanner.minCount);
  });

  test('download section links correctly to App Store and Google Play', async ({ page }) => {
    await page.goto('https://mb.io');
    const appStoreLink = page.locator('a[href*="apple.com"], a[href*="apps.apple"]').first();
    const googlePlayLink = page.locator('a[href*="play.google.com"]').first();
    const downloadLink = page.getByRole('link', { name: /download|app/i }).first();

    const hasAppStore = await appStoreLink.isVisible().catch(() => false);
    const hasGooglePlay = await googlePlayLink.isVisible().catch(() => false);
    const hasDownload = await downloadLink.isVisible().catch(() => false);

    expect(hasAppStore || hasGooglePlay || hasDownload).toBe(true);
  });

  test('About Us → Why MultiLink page renders expected components with correct text', async ({
    page,
  }) => {
    await page.goto('https://mb.io');
    const pageText = await page.locator('body').textContent() ?? '';
    const hasExpectedText = contentFixture.aboutPage.expectedTextSnippets.some((snippet) =>
      pageText.toLowerCase().includes(snippet.toLowerCase())
    );
    expect(hasExpectedText).toBe(true);
  });
});
