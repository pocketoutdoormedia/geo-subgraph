import { ArgsType, Field, InputType, ObjectType } from 'type-graphql';

@ObjectType()
export class Hike {
  constructor({ title, subtitle }: { title: string; subtitle: string }) {
    this.title = title;
    this.subtitle = subtitle;
  }
  @Field()
  title: string;

  @Field()
  subtitle: string;
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
