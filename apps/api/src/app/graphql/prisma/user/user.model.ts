import { ObjectType, ID, Field } from '@nestjs/graphql';
import { Post } from '../post/post.model';
import { Profile } from '../profile/profile.model';

@ObjectType({
        description: undefined
    })
export class User {

    @Field(() => ID, {
            nullable: false,
            description: undefined
        })
    id!: number;

    @Field(() => String, {
            nullable: false,
            description: undefined
        })
    email!: string;

    @Field(() => String, {
            nullable: true,
            description: undefined
        })
    name?: string | null;

    @Field(() => [Post], {
            nullable: true,
            description: undefined
        })
    posts?: Post[] | null;

    @Field(() => Profile, {
            nullable: true,
            description: undefined
        })
    profile?: Profile | null;
}
