import { InputType, Field } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { PostListRelationFilter } from '../post/post-list-relation-filter.input';
import { ProfileWhereInput } from '../profile/profile-where.input';

@InputType({})
export class UserWhereInput {

    @Field(() => [UserWhereInput], {
            nullable: true,
            description: undefined
        })
    AND?: UserWhereInput | UserWhereInput[] | null;

    @Field(() => [UserWhereInput], {
            nullable: true,
            description: undefined
        })
    OR?: UserWhereInput | UserWhereInput[] | null;

    @Field(() => [UserWhereInput], {
            nullable: true,
            description: undefined
        })
    NOT?: UserWhereInput | UserWhereInput[] | null;

    @Field(() => IntFilter, {
            nullable: true,
            description: undefined
        })
    id?: number | IntFilter | null;

    @Field(() => StringFilter, {
            nullable: true,
            description: undefined
        })
    email?: string | StringFilter | null;

    @Field(() => StringNullableFilter, {
            nullable: true,
            description: undefined
        })
    name?: string | StringNullableFilter | null;

    @Field(() => PostListRelationFilter, {
            nullable: true,
            description: undefined
        })
    posts?: PostListRelationFilter | null;

    @Field(() => ProfileWhereInput, {
            nullable: true,
            description: undefined
        })
    profile?: ProfileWhereInput | null;
}
