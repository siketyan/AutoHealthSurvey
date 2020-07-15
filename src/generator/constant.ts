import { IGenerator } from '.';

type Options = {
  value: unknown;
};

export class ConstantGenerator implements IGenerator<Options, unknown> {
  readonly type = 'constant';

  generate(options: Options): unknown {
    return options.value;
  }
}
