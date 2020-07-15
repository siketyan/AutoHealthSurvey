export type Url = string;
export type GeneratorType = string;

export type Answer = {
  generator: GeneratorType;
  options: { [p: string]: unknown };
};

export type Config = {
  version: number;
  url: Url;
  answers: Answer[];
};
