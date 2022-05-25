import { Args, Ctx, Query, Resolver } from 'type-graphql';
import { HikeArgs, Hikes } from './types';
import { DataSources } from '..';

@Resolver((of) => Hikes)
export class HikeResolver {
  @Query((returns) => Hikes)
  async getHikesCoord(
    @Args() { lat, lon }: HikeArgs,
    @Ctx() ctx: { dataSources: DataSources }
  ): Promise<Hikes> {
    const hike = await ctx.dataSources.gaiaApi.getNearbyHikes({
      lat: lat,
      lon: lon
    });
    return this.handleResponse(hike);
  }
  handleResponse(hike: Hikes): Hikes {
    if (!hike) {
      throw new Error(`No hikes found`);
    }

    return hike;
  }
}
