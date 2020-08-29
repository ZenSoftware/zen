import { InputType, Field } from '@nestjs/graphql';
import { PostWhereInput } from './post-where.input';

@InputType({})
export class PostListRelationFilter {

    @Field(() => PostWhereInput, {
            nullable: true,
            description: undefined
        })
    every?: PostWhereInput | null;

    @Field(() => PostWhereInput, {
            nullable: true,
            description: undefined
        })
    some?: PostWhereInput | null;

    @Field(() => PostWhereInput, {
            nullable: true,
            description: undefined
        })
    none?: PostWhereInput | null;
}
