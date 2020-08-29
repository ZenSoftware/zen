import { InputType, Field } from '@nestjs/graphql';

@InputType({})
export class ProfileCreateWithoutUserInput {

    @Field(() => String, {
            nullable: true,
            description: undefined
        })
    bio?: string | null;
}
