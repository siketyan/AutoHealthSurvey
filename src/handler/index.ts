import { ElementHandle } from 'puppeteer';

export interface IHandler {
  handle: (element: ElementHandle, value: unknown) => Promise<void>;
  supports: (element: ElementHandle) => Promise<boolean>;
}

export class HandlerResolver {
  constructor(
    private handlers: IHandler[],
  ) {
  }

  async resolve(element: ElementHandle): Promise<IHandler> {
    for (const handler of this.handlers) {
      if (await handler.supports(element)) {
        return handler;
      }
    }

    throw new Error(
      'No handler supports the question.',
    );
  }
}
