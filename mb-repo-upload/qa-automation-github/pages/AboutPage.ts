import { Page } from '@playwright/test';
import { BasePage } from './BasePage.js';
import { NavigationComponent } from './NavigationComponent.js';

/**
 * About Us → Why MultiLink page.
 */
export class AboutPage extends BasePage {
  readonly navigation: NavigationComponent;

  constructor(page: Page) {
    super(page, '/about/why-multilink');
    this.navigation = new NavigationComponent(page);
  }

  get mainContent(): ReturnType<Page['locator']> {
    return this.page.locator('main, [role="main"], article, .content').first();
  }

  get pageTitle(): ReturnType<Page['locator']> {
    return this.page.locator('h1').first();
  }

  async getPageText(): Promise<string> {
    const main = this.mainContent;
    return main.textContent() ?? '';
  }

  async getHeadingText(): Promise<string> {
    return (await this.pageTitle.textContent()) ?? '';
  }
}
