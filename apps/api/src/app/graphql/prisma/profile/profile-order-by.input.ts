import { InputType, Field } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType({})
export class ProfileOrderByInput {

    @Field(() => SortOrder, {
            nullable: true,
            description: undefined
        })
    id?: SortOrder | null;

    @Field(() => SortOrder, {
            nullable: true,
            description: undefined
        })
    bio?: SortOrder | null;

    @Field(() => SortOrder, {
            nullable: true,
            description: undefined
        })
    userId?: SortOrder | null;
}
