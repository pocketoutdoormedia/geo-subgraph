import { prismaClient } from '../../serviceClients/prisma';
import { AddExampleDbError, Example, GetExampleDbError } from './types';

export class ExampleDb {
  async getExampleById(id: number): Promise<Example> {
    const result = await prismaClient.example.findUnique({ where: { id } });

    if (!result) {
      throw new GetExampleDbError(id);
    }

    return result;
  }

  async addExample(data: { id: number }): Promise<Example> {
    try {
      const result = await prismaClient.example.create({
        data,
        select: {
          id: true
        }
      });

      return result;
    } catch (e) {
      throw new AddExampleDbError();
    }
  }
}

export * from './types';
