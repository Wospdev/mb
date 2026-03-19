import { Page } from '@playwright/test';
import { BasePage } from './BasePage.js';
import { NavigationComponent } from './NavigationComponent.js';

/**
 * Home page / main landing page of the MultiBank trading platform.
 */
export class HomePage extends BasePage {
  readonly navigation: NavigationComponent;

  constructor(page: Page) {
    super(page, '/');
    // Note: trade.mb.io may redirect to /login for unauthenticated users
    this.navigation = new NavigationComponent(page);
  }

  get marketingBanners(): ReturnType<Page['locator']> {
    return this.page.locator('[data-testid="marketing-banner"], .banner, [class*="banner"]').first();
  }

  get downloadSection(): ReturnType<Page['locator']> {
    return this.page.locator('a[href*="apps.apple.com"], a[href*="play.google.com"], [class*="download"]').first();
  }

  get appStoreLink(): ReturnType<Page['locator']> {
    return this.page.locator('a[href*="apps.apple.com"], a[href*="apple.com/app"]').first();
  }

  get googlePlayLink(): ReturnType<Page['locator']> {
    return this.page.locator('a[href*="play.google.com"], a[href*="play.google.com/store"]').first();
  }

  async getBannerElements(): Promise<ReturnType<Page['locator']>> {
    return this.page.locator('[class*="banner"], [class*="carousel"], [class*="promo"]');
  }

  async getDownloadLinks(): Promise<ReturnType<Page['locator']>> {
    return this.page.locator('a[href*="apple.com"], a[href*="google.com"]');
  }
}
