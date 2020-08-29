import { InputType, Field } from '@nestjs/graphql';
import { ProfileCreateWithoutUserInput } from './profile-create-without-user.input';
import { ProfileWhereUniqueInput } from './profile-where-unique.input';

@InputType({})
export class ProfileCreateOneWithoutUserInput {

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
}
