import { RESTDataSource } from 'apollo-datasource-rest';
import { toHikes } from '../Hike/typeConverters';
import { HikeArgs, Hikes } from '../Hike/types';

export class GaiaAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://www.gaiagps.com/api/';
  }

  async getNearbyHikes({
    lat,
    lon,
    limit = 10,
    min_ascent,
    max_ascent,
    min_length,
    max_length,
    min_difficulty,
    max_difficulty,
    min_stars,
    max_stars
  }: HikeArgs): Promise<Hikes> {
    const url =
      this.baseURL +
      'search/discover?result_types=hiking&lat=' +
      lat +
      '&lon=' +
      lon +
      '&limit=' +
      limit;
    const { ...response } = await this.get(url);
    const hikes = toHikes(response['results']);
    return new Hikes({
      lat,
      lon,
      hikes
    });
  }
}
