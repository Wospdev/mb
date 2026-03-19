import { Page, Locator } from '@playwright/test';

/**
 * Reusable Navigation component - top nav menu.
 * Used across HomePage and other pages.
 */
export class NavigationComponent {
  constructor(private readonly page: Page) {}

  private get navContainer(): Locator {
    return this.page.locator('nav, header, [role="navigation"]').first();
  }

  getNavLinkByText(text: string): Locator {
    return this.navContainer.getByRole('link', { name: text });
  }

  getAllNavLinks(): Locator {
    return this.page.locator('a[href]');
  }

  async isVisible(): Promise<boolean> {
    return this.navContainer.isVisible();
  }

  async clickNavItem(label: string): Promise<void> {
    await this.getNavLinkByText(label).click();
  }

  async getNavLabels(): Promise<string[]> {
    const links = this.getAllNavLinks();
    const count = await links.count();
    const labels: string[] = [];
    for (let i = 0; i < count; i++) {
      const loc = links.nth(i);
      const text = (await loc.innerText().catch(() => loc.textContent()))?.trim() ?? '';
      if (text && text.length < 50 && !text.includes('\n')) labels.push(text);
    }
    return labels;
  }
}
