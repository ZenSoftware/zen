import { InputType, Field } from '@nestjs/graphql';
import { ProfileUpdateWithoutUserDataInput } from './profile-update-without-user-data.input';
import { ProfileCreateWithoutUserInput } from './profile-create-without-user.input';

@InputType({})
export class ProfileUpsertWithoutUserInput {

    @Field(() => ProfileUpdateWithoutUserDataInput, {
            nullable: true,
            description: undefined
        })
    update?: ProfileUpdateWithoutUserDataInput | null;

    @Field(() => ProfileCreateWithoutUserInput, {
            nullable: true,
            description: undefined
        })
    create?: ProfileCreateWithoutUserInput | null;
}
