import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Context } from '../../config';
import { AddExampleInput, AddExamplePayload, Example } from './types';

@Resolver((of) => Example)
export class ExampleResolver {
  @Query((returns) => Example)
  async example(
    @Arg('id') id: number,
    @Ctx() ctx: Context
  ): Promise<Example | null> {
    return ctx.app.exampleApp.getExampleById(id);
  }

  @Mutation((returns) => AddExamplePayload)
  async addExample(
    @Arg('data') data: AddExampleInput,
    @Ctx() ctx: Context
  ): Promise<AddExamplePayload> {
    const example = await ctx.app.exampleApp.addExample(data);

    return { example };
  }
}
