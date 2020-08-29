import { InputType, Field } from '@nestjs/graphql';
import { PostCreateManyWithoutAuthorInput } from '../post/post-create-many-without-author.input';
import { ProfileCreateOneWithoutUserInput } from '../profile/profile-create-one-without-user.input';

@InputType({})
export class UserCreateInput {

    @Field(() => String, {
            nullable: true,
            description: undefined
        })
    email?: string | null;

    @Field(() => String, {
            nullable: true,
            description: undefined
        })
    name?: string | null;

    @Field(() => PostCreateManyWithoutAuthorInput, {
            nullable: true,
            description: undefined
        })
    posts?: PostCreateManyWithoutAuthorInput | null;

    @Field(() => ProfileCreateOneWithoutUserInput, {
            nullable: true,
            description: undefined
        })
    profile?: ProfileCreateOneWithoutUserInput | null;
}
