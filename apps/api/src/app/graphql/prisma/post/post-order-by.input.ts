import { InputType, Field } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType({})
export class PostOrderByInput {

    @Field(() => SortOrder, {
            nullable: true,
            description: undefined
        })
    id?: SortOrder | null;

    @Field(() => SortOrder, {
            nullable: true,
            description: undefined
        })
    createdAt?: SortOrder | null;

    @Field(() => SortOrder, {
            nullable: true,
            description: undefined
        })
    title?: SortOrder | null;

    @Field(() => SortOrder, {
            nullable: true,
            description: undefined
        })
    content?: SortOrder | null;

    @Field(() => SortOrder, {
            nullable: true,
            description: undefined
        })
    published?: SortOrder | null;

    @Field(() => SortOrder, {
            nullable: true,
            description: undefined
        })
    authorId?: SortOrder | null;
}
