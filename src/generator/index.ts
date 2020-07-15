import { Answer } from '../config';

export type GeneratorType = 'constant' | 'random';

export interface IGenerator<TOptions, TValue> {
  readonly type: GeneratorType;
  generate: (options: TOptions) => TValue;
}

export class GeneratorResolver {
  constructor(
    private generators: IGenerator<unknown, unknown>[],
  ) {
  }

  resolve(answer: Answer): IGenerator<unknown, unknown> {
    for (const generator of this.generators) {
      if (generator.type === answer.generator) {
        return generator;
      }
    }

    throw new Error(
      'No generator supports the answer config.',
    );
  }
}
