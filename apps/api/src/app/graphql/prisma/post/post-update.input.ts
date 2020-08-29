import { InputType, Field } from '@nestjs/graphql';
import { UserUpdateOneRequiredWithoutPostsInput } from '../user/user-update-one-required-without-posts.input';

@InputType({})
export class PostUpdateInput {

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

    @Field(() => UserUpdateOneRequiredWithoutPostsInput, {
            nullable: true,
            description: undefined
        })
    author?: UserUpdateOneRequiredWithoutPostsInput | null;
}
