import { InputType, Field } from '@nestjs/graphql';
import { ProfileCreateWithoutUserInput } from './profile-create-without-user.input';
import { ProfileWhereUniqueInput } from './profile-where-unique.input';
import { ProfileUpdateWithoutUserDataInput } from './profile-update-without-user-data.input';
import { ProfileUpsertWithoutUserInput } from './profile-upsert-without-user.input';

@InputType({})
export class ProfileUpdateOneWithoutUserInput {

    @Field(() => ProfileCreateWithoutUserInput, {
            nullable: true,
            description: undefined
        })
    create?: ProfileCreateWithoutUserInput | null;

    @Field(() => ProfileWhereUniqueInput, {
            nullable: true,
            description: undefined
        })
    connect?: ProfileWhereUniqueInput | null;

    @Field(() => Boolean, {
            nullable: true,
            description: undefined
        })
    disconnect?: boolean | null;

    @Field(() => Boolean, {
            nullable: true,
            description: undefined
        })
    delete?: boolean | null;

    @Field(() => ProfileUpdateWithoutUserDataInput, {
            nullable: true,
            description: undefined
        })
    update?: ProfileUpdateWithoutUserDataInput | null;

    @Field(() => ProfileUpsertWithoutUserInput, {
            nullable: true,
            description: undefined
        })
    upsert?: ProfileUpsertWithoutUserInput | null;
}
