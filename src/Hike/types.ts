import { ArgsType, Field, InputType, ObjectType } from 'type-graphql';

@ObjectType()
export class Hike {
  constructor({
    title,
    subtitle,
    bounds,
    location,
    thumbnail_url,
    state,
    stars
  }: {
    title: string;
    subtitle: string;
    bounds: number[];
    location: number[];
    thumbnail_url: string;
    state: string;
    stars: number;
  }) {
    this.title = title;
    this.subtitle = subtitle;
    this.state = state;
    this.bounds = bounds;
    this.location = location;
    this.thumbnail_url = thumbnail_url;
    this.stars = stars;
  }
  @Field()
  title: string;

  @Field()
  subtitle: string;

  @Field((type) => [Number])
  bounds: number[];

  @Field((type) => [Number])
  location: number[];

  @Field({ nullable: true })
  thumbnail_url: string;

  @Field()
  state: string;

  @Field()
  stars: number;
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
}
