import { InputType, Field } from '@nestjs/graphql';
import { NestedDateTimeFilter } from './nested-date-time-filter.input';

@InputType({})
export class DateTimeFilter {

    @Field(() => String, {
            nullable: true,
            description: undefined
        })
    equals?: string | null;

    @Field(() => [String], {
            nullable: true,
            description: undefined
        })
    in?: string | string[] | null;

    @Field(() => [String], {
            nullable: true,
            description: undefined
        })
    notIn?: string | string[] | null;

    @Field(() => String, {
            nullable: true,
            description: undefined
        })
    lt?: string | null;

    @Field(() => String, {
            nullable: true,
            description: undefined
        })
    lte?: string | null;

    @Field(() => String, {
            nullable: true,
            description: undefined
        })
    gt?: string | null;

    @Field(() => String, {
            nullable: true,
            description: undefined
        })
    gte?: string | null;

    @Field(() => NestedDateTimeFilter, {
            nullable: true,
            description: undefined
        })
    not?: string | NestedDateTimeFilter | null;
}
