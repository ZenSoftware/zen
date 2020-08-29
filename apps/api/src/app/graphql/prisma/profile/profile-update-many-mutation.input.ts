import { InputType, Field } from '@nestjs/graphql';

@InputType({})
export class ProfileUpdateManyMutationInput {

    @Field(() => String, {
            nullable: true,
            description: undefined
        })
    bio?: string | null;
}
