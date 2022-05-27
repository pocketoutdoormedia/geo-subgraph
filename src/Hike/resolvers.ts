import { Args, Ctx, Query, Resolver } from 'type-graphql';
import { HikeArgs, Hikes } from './types';
import { DataSources } from '..';

@Resolver((of) => Hikes)
export class HikeResolver {
  @Query((returns) => Hikes)
  async getHikesCoord(
    @Args()
    {
      lat,
      lon,
      limit,
      min_ascent,
      max_ascent,
      min_length,
      max_length,
      min_difficulty,
      max_difficulty,
      min_stars,
      max_stars
    }: HikeArgs,
    @Ctx() ctx: { dataSources: DataSources }
  ): Promise<Hikes> {
    const hikes = await ctx.dataSources.gaiaApi.getNearbyHikes({
      lat: lat,
      lon: lon,
      limit: limit,
      min_ascent: min_ascent,
      max_ascent: max_ascent,
      min_length: min_length,
      max_length: max_length,
      min_difficulty: min_difficulty,
      max_difficulty: max_difficulty,
      min_stars: min_stars,
      max_stars: max_stars
    });
    return this.handleResponse(hikes);
  }
  handleResponse(hikes: Hikes): Hikes {
    if (!hikes) {
      throw new Error(`No hikes found`);
    }

    return hikes;
  }
}
