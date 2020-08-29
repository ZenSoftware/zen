import { InputType, Field } from '@nestjs/graphql';
import { ProfileCreateOneWithoutUserInput } from '../profile/profile-create-one-without-user.input';

@InputType({})
export class UserCreateWithoutPostsInput {

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

    @Field(() => ProfileCreateOneWithoutUserInput, {
            nullable: true,
            description: undefined
        })
    profile?: ProfileCreateOneWithoutUserInput | null;
}
