import { promises } from 'fs';
import { join } from 'path';
import { safeLoad } from 'js-yaml';

import { Config } from '.';

const { readFile } = promises;
const filename = 'config.yaml';

export class ConfigLoader {
  private readonly path: string;

  constructor(directory: string) {
    this.path = join(directory, filename);
  }

  async load(): Promise<Config> {
    const yaml = await readFile(this.path, 'utf8');
    return safeLoad(yaml) as Config;
  }
}
