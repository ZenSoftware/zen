import { InputType, Field } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { UserWhereInput } from '../user/user-where.input';

@InputType({})
export class ProfileWhereInput {

    @Field(() => [ProfileWhereInput], {
            nullable: true,
            description: undefined
        })
    AND?: ProfileWhereInput | ProfileWhereInput[] | null;

    @Field(() => [ProfileWhereInput], {
            nullable: true,
            description: undefined
        })
    OR?: ProfileWhereInput | ProfileWhereInput[] | null;

    @Field(() => [ProfileWhereInput], {
            nullable: true,
            description: undefined
        })
    NOT?: ProfileWhereInput | ProfileWhereInput[] | null;

    @Field(() => IntFilter, {
            nullable: true,
            description: undefined
        })
    id?: number | IntFilter | null;

    @Field(() => StringNullableFilter, {
            nullable: true,
            description: undefined
        })
    bio?: string | StringNullableFilter | null;

    @Field(() => UserWhereInput, {
            nullable: true,
            description: undefined
        })
    user?: UserWhereInput | null;

    @Field(() => IntFilter, {
            nullable: true,
            description: undefined
        })
    userId?: number | IntFilter | null;
}
