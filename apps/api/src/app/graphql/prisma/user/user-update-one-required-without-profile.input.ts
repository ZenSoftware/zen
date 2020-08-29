import { InputType, Field } from '@nestjs/graphql';
import { UserCreateWithoutProfileInput } from './user-create-without-profile.input';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { UserUpdateWithoutProfileDataInput } from './user-update-without-profile-data.input';
import { UserUpsertWithoutProfileInput } from './user-upsert-without-profile.input';

@InputType({})
export class UserUpdateOneRequiredWithoutProfileInput {

    @Field(() => UserCreateWithoutProfileInput, {
            nullable: true,
            description: undefined
        })
    create?: UserCreateWithoutProfileInput | null;

    @Field(() => UserWhereUniqueInput, {
            nullable: true,
            description: undefined
        })
    connect?: UserWhereUniqueInput | null;

    @Field(() => UserUpdateWithoutProfileDataInput, {
            nullable: true,
            description: undefined
        })
    update?: UserUpdateWithoutProfileDataInput | null;

    @Field(() => UserUpsertWithoutProfileInput, {
            nullable: true,
            description: undefined
        })
    upsert?: UserUpsertWithoutProfileInput | null;
}
