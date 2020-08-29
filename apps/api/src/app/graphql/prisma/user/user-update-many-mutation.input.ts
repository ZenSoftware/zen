import { InputType, Field } from '@nestjs/graphql';

@InputType({})
export class UserUpdateManyMutationInput {

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
}
