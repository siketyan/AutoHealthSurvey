import { IGenerator } from '.';

type Options = {
  min: number,
  max: number,
};

export class RandomGenerator implements IGenerator<Options, number> {
  readonly type = 'random';

  generate(options: Options): number {
    return Math.round(Math.random() * (options.max - options.min)) + options.min;
  }
}
