import { Page } from '@playwright/test';
import { BasePage } from './BasePage.js';
import { NavigationComponent } from './NavigationComponent.js';

/**
 * Spot trading page - displays trading pairs across categories.
 */
export class TradingPage extends BasePage {
  readonly navigation: NavigationComponent;

  constructor(page: Page) {
    super(page, '/trade');
    this.navigation = new NavigationComponent(page);
  }

  get tradingPairsSection(): ReturnType<Page['locator']> {
    return this.page.locator('[class*="trading"], [class*="pairs"], [class*="market"], [data-testid*="trade"]').first();
  }

  get pairCategories(): ReturnType<Page['locator']> {
    return this.page.locator('[class*="category"], [class*="tab"], [role="tablist"] button, [class*="pair"]');
  }

  get tradingPairRows(): ReturnType<Page['locator']> {
    return this.page.locator('tr[class*="pair"], [class*="pair-row"], [data-symbol], [class*="symbol"]');
  }

  async getVisiblePairSymbols(): Promise<string[]> {
    const rows = this.page.locator('[class*="pair"], [data-symbol], [class*="symbol"]');
    const count = await rows.count();
    const symbols: string[] = [];
    for (let i = 0; i < Math.min(count, 20); i++) {
      const text = await rows.nth(i).textContent();
      if (text?.trim() && text.length < 20) symbols.push(text.trim());
    }
    return symbols;
  }
}
