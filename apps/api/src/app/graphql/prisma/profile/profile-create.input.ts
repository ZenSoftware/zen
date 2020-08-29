import { InputType, Field } from '@nestjs/graphql';
import { UserCreateOneWithoutProfileInput } from '../user/user-create-one-without-profile.input';

@InputType({})
export class ProfileCreateInput {

    @Field(() => String, {
            nullable: true,
            description: undefined
        })
    bio?: string | null;

    @Field(() => UserCreateOneWithoutProfileInput, {
            nullable: true,
            description: undefined
        })
    user?: UserCreateOneWithoutProfileInput | null;
}
