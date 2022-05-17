import { Directive, ObjectType, Field, InputType } from 'type-graphql';

@Directive(`@extends`)
@Directive(`@key(fields: "id")`)
@ObjectType()
export class Example {
  @Directive('@external')
  @Field()
  id!: number;
}

@ObjectType()
export class AddExamplePayload {
  @Field((type) => Example, { nullable: true })
  example?: Example;
}

@InputType()
export class AddExampleInput {
  @Field()
  id!: number;
}
