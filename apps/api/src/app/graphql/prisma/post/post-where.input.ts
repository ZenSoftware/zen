import { InputType, Field } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { BoolFilter } from '../prisma/bool-filter.input';
import { UserWhereInput } from '../user/user-where.input';

@InputType({})
export class PostWhereInput {

    @Field(() => [PostWhereInput], {
            nullable: true,
            description: undefined
        })
    AND?: PostWhereInput | PostWhereInput[] | null;

    @Field(() => [PostWhereInput], {
            nullable: true,
            description: undefined
        })
    OR?: PostWhereInput | PostWhereInput[] | null;

    @Field(() => [PostWhereInput], {
            nullable: true,
            description: undefined
        })
    NOT?: PostWhereInput | PostWhereInput[] | null;

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

    @Field(() => UserWhereInput, {
            nullable: true,
            description: undefined
        })
    author?: UserWhereInput | null;

    @Field(() => IntFilter, {
            nullable: true,
            description: undefined
        })
    authorId?: number | IntFilter | null;
}
