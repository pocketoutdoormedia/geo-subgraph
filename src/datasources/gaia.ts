import { RESTDataSource } from 'apollo-datasource-rest';
import { toHikes } from '../Hike/typeConverters';
import { HikeArgs, Hikes } from '../Hike/types';

export class GaiaAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://www.gaiagps.com/api/';
  }

  async getNearbyHikes({ lat, lon }: HikeArgs): Promise<Hikes> {
    const url =
      this.baseURL +
      'search/discover?result_types=hiking&lat=' +
      lat +
      '&lon=' +
      lon;
    const { ...response } = await this.get(url);
    const hikes = toHikes(response['results']);
    return new Hikes({
      lat,
      lon,
      hikes
    });
  }
}
