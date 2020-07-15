import { Page } from 'puppeteer';

export class Authenticator {
  constructor(
    private page: Page,
  ) {
  }

  async login(email: string, password: string): Promise<void> {
    await this.type('input[type="email"]', email);
    await this.submit();

    await this.type('input[type="password"]:not([aria-hidden])', password);
    await this.submit();

    await this.click('input[type="checkbox"]');
    await this.submit();
  }

  private submit(): Promise<void> {
    return this.click('input[type="submit"]');
  }

  private click(selector: string): Promise<void> {
    return this.page
      .waitForSelector(selector)
      .then(el => el.click())
      ;
  }

  private type(selector: string, str: string): Promise<void> {
    return this.page
      .waitForSelector(selector)
      .then(el => el.type(str))
      ;
  }
}
