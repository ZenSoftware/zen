import { InputType, Field } from '@nestjs/graphql';

@InputType({})
export class ProfileUpdateWithoutUserDataInput {

    @Field(() => String, {
            nullable: true,
            description: undefined
        })
    bio?: string | null;
}
