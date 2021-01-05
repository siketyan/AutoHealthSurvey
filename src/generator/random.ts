import { IGenerator } from '.';

type Options = {
  min: number,
  max: number,
  decimal?: number,
};

export class RandomGenerator implements IGenerator<Options, string> {
  readonly type = 'random';

  generate(options: Options): string {
    return (Math.random() * (options.max - options.min) + options.min).toFixed(options.decimal ?? 0);
  }
}
