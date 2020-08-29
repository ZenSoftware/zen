import { InputType, Field } from '@nestjs/graphql';
import { UserCreateOneWithoutPostsInput } from '../user/user-create-one-without-posts.input';

@InputType({})
export class PostCreateInput {

    @Field(() => String, {
            nullable: true,
            description: undefined
        })
    createdAt?: string | null;

    @Field(() => String, {
            nullable: true,
            description: undefined
        })
    title?: string | null;

    @Field(() => String, {
            nullable: true,
            description: undefined
        })
    content?: string | null;

    @Field(() => Boolean, {
            nullable: true,
            description: undefined
        })
    published?: boolean | null;

    @Field(() => UserCreateOneWithoutPostsInput, {
            nullable: true,
            description: undefined
        })
    author?: UserCreateOneWithoutPostsInput | null;
}
