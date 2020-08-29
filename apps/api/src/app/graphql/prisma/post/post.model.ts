import { ObjectType, ID, Field, Int } from '@nestjs/graphql';
import { User } from '../user/user.model';

@ObjectType({
        description: undefined
    })
export class Post {

    @Field(() => ID, {
            nullable: false,
            description: undefined
        })
    id!: number;

    @Field(() => String, {
            nullable: false,
            description: undefined
        })
    createdAt!: string;

    @Field(() => String, {
            nullable: false,
            description: undefined
        })
    title!: string;

    @Field(() => String, {
            nullable: true,
            description: undefined
        })
    content?: string | null;

    @Field(() => Boolean, {
            nullable: false,
            defaultValue: false,
            description: undefined
        })
    published!: boolean;

    @Field(() => User, {
            nullable: false,
            description: undefined
        })
    author!: User;

    @Field(() => Int, {
            nullable: false,
            description: undefined
        })
    readonly authorId!: number;
}
