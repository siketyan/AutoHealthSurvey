import { ElementHandle } from 'puppeteer';

import { IHandler } from '.';

const getTextbox = (element: ElementHandle) => {
  return element.$('.office-form-question-textbox');
};

export class TextHandler implements IHandler {
  async handle(element: ElementHandle, value: unknown): Promise<void> {
    if (typeof value !== 'string') {
      value = value.toString();
    }

    const input = await getTextbox(element);
    return input.type(value as string);
  }

  async supports(element: ElementHandle): Promise<boolean> {
    return await getTextbox(element) !== null;
  }
}
