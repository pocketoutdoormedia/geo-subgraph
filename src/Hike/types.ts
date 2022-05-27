import { ArgsType, Field, InputType, ObjectType } from 'type-graphql';

@ObjectType()
export class Hike {
  constructor({
    title,
    subtitle,
    bounds,
    location,
    centroid,
    thumbnail_url,
    state,
    stars,
    country,
    cover_photo_id,
    id,
    known_route_id,
    kr_ascent,
    kr_difficulty,
    kr_difficulty_class,
    kr_driveable,
    kr_length,
    kr_route_type,
    kr_tobler_time,
    land,
    osm_id,
    permalink,
    permalink_api,
    permalink_api_v2,
    type
  }: {
    title: string;
    subtitle: string;
    bounds: number[];
    location: number[];
    centroid: number[];
    thumbnail_url: string;
    state: string;
    stars: number;
    country: string;
    cover_photo_id: string;
    id: string;
    known_route_id: number;
    kr_ascent: number;
    kr_difficulty: number;
    kr_difficulty_class: string;
    kr_driveable: boolean;
    kr_length: number;
    kr_route_type: string;
    kr_tobler_time: boolean;
    land: string;
    osm_id: number;
    permalink: string;
    permalink_api: string;
    permalink_api_v2: string;
    type: string;
  }) {
    this.title = title;
    this.subtitle = subtitle;
    this.state = state;
    this.bounds = bounds;
    this.location = location;
    this.centroid = centroid;
    this.thumbnail_url = thumbnail_url;
    this.stars = stars;
    this.country = country;
    (this.cover_photo_id = cover_photo_id),
      (this.id = id),
      (this.known_route_id = known_route_id),
      (this.kr_ascent = kr_ascent),
      (this.kr_difficulty = kr_difficulty),
      (this.kr_difficulty_class = kr_difficulty_class),
      (this.kr_driveable = kr_driveable),
      (this.kr_length = kr_length),
      (this.kr_route_type = kr_route_type),
      (this.kr_tobler_time = kr_tobler_time),
      (this.land = land),
      (this.osm_id = osm_id),
      (this.permalink = permalink),
      (this.permalink_api = permalink_api),
      (this.permalink_api_v2 = permalink_api_v2),
      (this.type = type);
  }
  @Field()
  title: string;

  @Field()
  subtitle: string;

  @Field((type) => [Number])
  bounds: number[];

  @Field((type) => [Number])
  location: number[];

  @Field((type) => [Number])
  centroid: number[];

  @Field({ nullable: true })
  thumbnail_url: string;

  @Field()
  state: string;

  @Field()
  stars: number;

  @Field()
  country: string;

  @Field({ nullable: true })
  cover_photo_id: string;

  @Field()
  id: string;

  @Field()
  known_route_id: number;

  @Field()
  kr_ascent: number;

  @Field()
  kr_difficulty: number;

  @Field()
  kr_difficulty_class: string;

  @Field((type) => Boolean)
  kr_driveable: boolean;

  @Field()
  kr_length: number;

  @Field()
  kr_route_type: string;

  @Field((type) => Boolean, { nullable: true })
  kr_tobler_time: boolean;

  @Field({ nullable: true })
  land: string;

  @Field()
  osm_id: number;

  @Field()
  permalink: string;

  @Field()
  permalink_api: string;

  @Field()
  permalink_api_v2: string;

  @Field()
  type: string;
}

@ObjectType()
export class Hikes {
  constructor(nearbyHikes: { [key: string]: any }) {
    const { lat, lon, hikes } = nearbyHikes;
    this.lat = lat;
    this.lon = lon;
    this.hikes = hikes;
  }
  @Field()
  lat: number;

  @Field()
  lon: number;

  @Field((type) => [Hike])
  hikes: Hike[];
}

@InputType()
export class HikeFilter {
  @Field((type) => Number)
  lat?: number;

  @Field((type) => Number)
  lon?: number;
}

@ArgsType()
export class HikeArgs {
  @Field()
  lat?: number;

  @Field()
  lon?: number;

  @Field({ nullable: true })
  limit?: number;

  @Field({ nullable: true })
  min_ascent?: number;

  @Field({ nullable: true })
  max_ascent?: number;

  @Field({ nullable: true })
  min_length?: number;

  @Field({ nullable: true })
  max_length?: number;

  @Field({ nullable: true })
  min_difficulty?: number;

  @Field({ nullable: true })
  max_difficulty?: number;

  @Field({ nullable: true })
  min_stars?: number;

  @Field({ nullable: true })
  max_stars?: number;
}
