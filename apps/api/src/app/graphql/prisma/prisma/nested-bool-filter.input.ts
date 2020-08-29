import { InputType, Field } from '@nestjs/graphql';

@InputType({})
export class NestedBoolFilter {

    @Field(() => Boolean, {
            nullable: true,
            description: undefined
        })
    equals?: boolean | null;

    @Field(() => NestedBoolFilter, {
            nullable: true,
            description: undefined
        })
    not?: NestedBoolFilter | null;
}
