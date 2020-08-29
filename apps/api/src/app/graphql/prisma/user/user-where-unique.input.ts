import { InputType, Int, Field } from '@nestjs/graphql';

@InputType({})
export class UserWhereUniqueInput {

    @Field(() => Int, {
            nullable: true,
            description: undefined
        })
    id?: number | null;

    @Field(() => String, {
            nullable: true,
            description: undefined
        })
    email?: string | null;
}
