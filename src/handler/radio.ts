import { ElementHandle } from 'puppeteer';

import { IHandler } from '.';

export class RadioHandler implements IHandler {
  async handle(element: ElementHandle, value: unknown): Promise<void> {
    const input = await element.$(`input[type="radio"][value="${value}"]`);
    return input.click();
  }

  async supports(element: ElementHandle): Promise<boolean> {
    return await element.$('[role="radiogroup"]') !== null;
  }
}
