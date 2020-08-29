import { InputType, Field } from '@nestjs/graphql';
import { UserCreateWithoutPostsInput } from './user-create-without-posts.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType({})
export class UserCreateOneWithoutPostsInput {

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
}
