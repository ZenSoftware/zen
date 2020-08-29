import { InputType, Field } from '@nestjs/graphql';
import { PostWhereUniqueInput } from './post-where-unique.input';
import { PostUpdateWithoutAuthorDataInput } from './post-update-without-author-data.input';
import { PostCreateWithoutAuthorInput } from './post-create-without-author.input';

@InputType({})
export class PostUpsertWithWhereUniqueWithoutAuthorInput {

    @Field(() => PostWhereUniqueInput, {
            nullable: true,
            description: undefined
        })
    where?: PostWhereUniqueInput | null;

    @Field(() => PostUpdateWithoutAuthorDataInput, {
            nullable: true,
            description: undefined
        })
    update?: PostUpdateWithoutAuthorDataInput | null;

    @Field(() => PostCreateWithoutAuthorInput, {
            nullable: true,
            description: undefined
        })
    create?: PostCreateWithoutAuthorInput | null;
}
