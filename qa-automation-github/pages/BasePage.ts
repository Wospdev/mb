import { Page, Locator } from '@playwright/test';

/**
 * Base Page class providing shared methods for all page objects.
 * Implements common patterns: navigate, waitFor, click, fill, screenshot.
 */
export abstract class BasePage {
  constructor(protected readonly page: Page, protected readonly path: string = '') {}

  /**
   * Navigate to the page. Uses baseURL from config + optional path.
   */
  async navigate(): Promise<void> {
    await this.page.goto(this.path, { waitUntil: 'domcontentloaded' });
  }

  /**
   * Wait for a locator to be visible with configurable timeout.
   * No fixed sleeps - uses Playwright's built-in auto-waiting.
   */
  async waitForVisible(locator: Locator, timeout = 15000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  /**
   * Click an element with proper wait for actionability.
   */
  async click(locator: Locator): Promise<void> {
    await locator.click();
  }

  /**
   * Fill an input field.
   */
  async fill(locator: Locator, value: string): Promise<void> {
    await locator.fill(value);
  }

  /**
   * Take a screenshot for failure diagnostics.
   */
  async screenshot(name: string): Promise<Buffer> {
    return this.page.screenshot({ path: `reports/screenshots/${name}.png` });
  }

  /**
   * Get the current URL.
   */
  getUrl(): string {
    return this.page.url();
  }

  /**
   * Wait for network to be idle (useful after navigation).
   */
  async waitForNetworkIdle(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }
}
