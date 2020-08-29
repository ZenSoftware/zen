import { InputType, Field } from '@nestjs/graphql';
import { NestedBoolFilter } from './nested-bool-filter.input';

@InputType({})
export class BoolFilter {

    @Field(() => Boolean, {
            nullable: true,
            description: undefined
        })
    equals?: boolean | null;

    @Field(() => NestedBoolFilter, {
            nullable: true,
            description: undefined
        })
    not?: boolean | NestedBoolFilter | null;
}
