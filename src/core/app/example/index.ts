import { ExampleDb } from '../../db';
import { Example } from '../../db/example/types';
import { ExampleAppDeps } from './types';

export class ExampleApp {
  private exampleDb: ExampleDb;

  constructor(deps?: ExampleAppDeps) {
    this.exampleDb = deps?.ExampleDb || new ExampleDb();
  }

  async getExampleById(id: number): Promise<Example> {
    return this.exampleDb.getExampleById(id);
  }

  async addExample(data: { id: number }): Promise<Example> {
    return this.exampleDb.addExample(data);
  }
}
