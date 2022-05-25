import { Args, Ctx, Query, Resolver } from 'type-graphql';
import { HikeArgs, Hikes } from './types';
import { DataSources } from '..';

@Resolver((of) => Hikes)
export class HikeResolver {
  @Query((returns) => Hikes)
  async getHikesCoord(
    @Args() { lat, lon, limit }: HikeArgs,
    @Ctx() ctx: { dataSources: DataSources }
  ): Promise<Hikes> {
    const hikes = await ctx.dataSources.gaiaApi.getNearbyHikes({
      lat: lat,
      lon: lon,
      limit: limit
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
