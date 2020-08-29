import { InputType, Field } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { BoolFilter } from '../prisma/bool-filter.input';

@InputType({})
export class PostScalarWhereInput {

    @Field(() => [PostScalarWhereInput], {
            nullable: true,
            description: undefined
        })
    AND?: PostScalarWhereInput | PostScalarWhereInput[] | null;

    @Field(() => [PostScalarWhereInput], {
            nullable: true,
            description: undefined
        })
    OR?: PostScalarWhereInput | PostScalarWhereInput[] | null;

    @Field(() => [PostScalarWhereInput], {
            nullable: true,
            description: undefined
        })
    NOT?: PostScalarWhereInput | PostScalarWhereInput[] | null;

    @Field(() => IntFilter, {
            nullable: true,
            description: undefined
        })
    id?: number | IntFilter | null;

    @Field(() => DateTimeFilter, {
            nullable: true,
            description: undefined
        })
    createdAt?: string | DateTimeFilter | null;

    @Field(() => StringFilter, {
            nullable: true,
            description: undefined
        })
    title?: string | StringFilter | null;

    @Field(() => StringNullableFilter, {
            nullable: true,
            description: undefined
        })
    content?: string | StringNullableFilter | null;

    @Field(() => BoolFilter, {
            nullable: true,
            description: undefined
        })
    published?: boolean | BoolFilter | null;

    @Field(() => IntFilter, {
            nullable: true,
            description: undefined
        })
    authorId?: number | IntFilter | null;
}
