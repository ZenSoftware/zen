import { InputType, Field } from '@nestjs/graphql';
import { UserUpdateWithoutPostsDataInput } from './user-update-without-posts-data.input';
import { UserCreateWithoutPostsInput } from './user-create-without-posts.input';

@InputType({})
export class UserUpsertWithoutPostsInput {

    @Field(() => UserUpdateWithoutPostsDataInput, {
            nullable: true,
            description: undefined
        })
    update?: UserUpdateWithoutPostsDataInput | null;

    @Field(() => UserCreateWithoutPostsInput, {
            nullable: true,
            description: undefined
        })
    create?: UserCreateWithoutPostsInput | null;
}
