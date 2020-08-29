import { InputType, Field } from '@nestjs/graphql';
import { ProfileUpdateOneWithoutUserInput } from '../profile/profile-update-one-without-user.input';

@InputType({})
export class UserUpdateWithoutPostsDataInput {

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

    @Field(() => ProfileUpdateOneWithoutUserInput, {
            nullable: true,
            description: undefined
        })
    profile?: ProfileUpdateOneWithoutUserInput | null;
}
