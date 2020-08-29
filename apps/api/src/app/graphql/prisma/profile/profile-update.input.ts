import { InputType, Field } from '@nestjs/graphql';
import { UserUpdateOneRequiredWithoutProfileInput } from '../user/user-update-one-required-without-profile.input';

@InputType({})
export class ProfileUpdateInput {

    @Field(() => String, {
            nullable: true,
            description: undefined
        })
    bio?: string | null;

    @Field(() => UserUpdateOneRequiredWithoutProfileInput, {
            nullable: true,
            description: undefined
        })
    user?: UserUpdateOneRequiredWithoutProfileInput | null;
}
