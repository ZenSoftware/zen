import { InputType, Field } from '@nestjs/graphql';
import { PostCreateWithoutAuthorInput } from './post-create-without-author.input';
import { PostWhereUniqueInput } from './post-where-unique.input';

@InputType({})
export class PostCreateManyWithoutAuthorInput {

    @Field(() => [PostCreateWithoutAuthorInput], {
            nullable: true,
            description: undefined
        })
    create?: PostCreateWithoutAuthorInput | PostCreateWithoutAuthorInput[] | null;

    @Field(() => [PostWhereUniqueInput], {
            nullable: true,
            description: undefined
        })
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[] | null;
}
