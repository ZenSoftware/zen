import { InputType, Field } from '@nestjs/graphql';
import { UserCreateWithoutProfileInput } from './user-create-without-profile.input';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType({})
export class UserCreateOneWithoutProfileInput {

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
}
