import { env } from 'process';
import { platform } from 'os';
import { launch, Page } from 'puppeteer';

export class Chromium {
  async launch(headless: boolean = true): Promise<Page> {
    const browser = await launch({
      // Headless mode not working on Windows
      headless: platform() === 'win32' ? false : headless,
      defaultViewport: null,
      executablePath: env['CHROMIUM_PATH'] ?? null,
      userDataDir: './data',
      args: [
        '--no-sandbox',
        '--disable-gpu',
      ],
    });

    return (await browser.pages())[0] ?? await browser.newPage();
  }
}
