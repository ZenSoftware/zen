import { InputType, Field } from '@nestjs/graphql';
import { PostUpdateManyWithoutAuthorInput } from '../post/post-update-many-without-author.input';
import { ProfileUpdateOneWithoutUserInput } from '../profile/profile-update-one-without-user.input';

@InputType({})
export class UserUpdateInput {

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

    @Field(() => PostUpdateManyWithoutAuthorInput, {
            nullable: true,
            description: undefined
        })
    posts?: PostUpdateManyWithoutAuthorInput | null;

    @Field(() => ProfileUpdateOneWithoutUserInput, {
            nullable: true,
            description: undefined
        })
    profile?: ProfileUpdateOneWithoutUserInput | null;
}
