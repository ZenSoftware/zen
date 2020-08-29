import { InputType, Int, Field } from '@nestjs/graphql';

@InputType({})
export class ProfileWhereUniqueInput {

    @Field(() => Int, {
            nullable: true,
            description: undefined
        })
    id?: number | null;

    @Field(() => Int, {
            nullable: true,
            description: undefined
        })
    userId?: number | null;
}
