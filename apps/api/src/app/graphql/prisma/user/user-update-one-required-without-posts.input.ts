import { InputType, Field } from '@nestjs/graphql';
import { UserCreateWithoutPostsInput } from './user-create-without-posts.input';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { UserUpdateWithoutPostsDataInput } from './user-update-without-posts-data.input';
import { UserUpsertWithoutPostsInput } from './user-upsert-without-posts.input';

@InputType({})
export class UserUpdateOneRequiredWithoutPostsInput {

    @Field(() => UserCreateWithoutPostsInput, {
            nullable: true,
            description: undefined
        })
    create?: UserCreateWithoutPostsInput | null;

    @Field(() => UserWhereUniqueInput, {
            nullable: true,
            description: undefined
        })
    connect?: UserWhereUniqueInput | null;

    @Field(() => UserUpdateWithoutPostsDataInput, {
            nullable: true,
            description: undefined
        })
    update?: UserUpdateWithoutPostsDataInput | null;

    @Field(() => UserUpsertWithoutPostsInput, {
            nullable: true,
            description: undefined
        })
    upsert?: UserUpsertWithoutPostsInput | null;
}
