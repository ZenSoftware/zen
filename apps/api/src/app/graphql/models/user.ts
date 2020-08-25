import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(type => Int)
  id: number;

  @Field()
  email: string;

  @Field({ nullable: true })
  name?: string;

  // posts
  // profile
}
