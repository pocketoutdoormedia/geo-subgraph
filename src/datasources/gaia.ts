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
    limit,
    min_ascent,
    max_ascent,
    min_length,
    max_length,
    min_difficulty,
    max_difficulty,
    min_stars,
    max_stars
  }: HikeArgs): Promise<Hikes> {
    const filter_options = {
      limit: limit,
      min_ascent: min_ascent,
      max_ascent: max_ascent,
      min_length: min_length,
      max_length: max_length,
      min_difficulty: min_difficulty,
      max_difficulty: max_difficulty,
      min_stars: min_stars,
      max_stars: max_stars
    };

    let url =
      this.baseURL +
      'search/discover?result_types=hiking&lat=' +
      lat +
      '&lon=' +
      lon;
    Object.entries(filter_options).forEach(([key, value]) => {
      if (value != null) {
        url += '&' + key + '=' + value;
      }
    });
    const { ...response } = await this.get(url);
    const hikes = toHikes(response['results']);
    return new Hikes({
      lat,
      lon,
      hikes
    });
  }
}
