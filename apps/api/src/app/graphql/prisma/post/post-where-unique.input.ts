import { InputType, Int, Field } from '@nestjs/graphql';

@InputType({})
export class PostWhereUniqueInput {

    @Field(() => Int, {
            nullable: true,
            description: undefined
        })
    id?: number | null;
}
