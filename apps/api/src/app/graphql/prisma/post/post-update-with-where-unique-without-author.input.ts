import { InputType, Field } from '@nestjs/graphql';
import { PostWhereUniqueInput } from './post-where-unique.input';
import { PostUpdateWithoutAuthorDataInput } from './post-update-without-author-data.input';

@InputType({})
export class PostUpdateWithWhereUniqueWithoutAuthorInput {

    @Field(() => PostWhereUniqueInput, {
            nullable: true,
            description: undefined
        })
    where?: PostWhereUniqueInput | null;

    @Field(() => PostUpdateWithoutAuthorDataInput, {
            nullable: true,
            description: undefined
        })
    data?: PostUpdateWithoutAuthorDataInput | null;
}
