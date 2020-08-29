import { InputType, Int, Field } from '@nestjs/graphql';
import { NestedIntFilter } from './nested-int-filter.input';

@InputType({})
export class IntFilter {

    @Field(() => Int, {
            nullable: true,
            description: undefined
        })
    equals?: number | null;

    @Field(() => [Int], {
            nullable: true,
            description: undefined
        })
    in?: number | number[] | null;

    @Field(() => [Int], {
            nullable: true,
            description: undefined
        })
    notIn?: number | number[] | null;

    @Field(() => Int, {
            nullable: true,
            description: undefined
        })
    lt?: number | null;

    @Field(() => Int, {
            nullable: true,
            description: undefined
        })
    lte?: number | null;

    @Field(() => Int, {
            nullable: true,
            description: undefined
        })
    gt?: number | null;

    @Field(() => Int, {
            nullable: true,
            description: undefined
        })
    gte?: number | null;

    @Field(() => NestedIntFilter, {
            nullable: true,
            description: undefined
        })
    not?: number | NestedIntFilter | null;
}
