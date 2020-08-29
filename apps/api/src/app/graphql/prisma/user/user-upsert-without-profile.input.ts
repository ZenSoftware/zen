import { InputType, Field } from '@nestjs/graphql';
import { UserUpdateWithoutProfileDataInput } from './user-update-without-profile-data.input';
import { UserCreateWithoutProfileInput } from './user-create-without-profile.input';

@InputType({})
export class UserUpsertWithoutProfileInput {

    @Field(() => UserUpdateWithoutProfileDataInput, {
            nullable: true,
            description: undefined
        })
    update?: UserUpdateWithoutProfileDataInput | null;

    @Field(() => UserCreateWithoutProfileInput, {
            nullable: true,
            description: undefined
        })
    create?: UserCreateWithoutProfileInput | null;
}
