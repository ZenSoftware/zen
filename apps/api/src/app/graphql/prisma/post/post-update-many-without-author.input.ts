import { InputType, Field } from '@nestjs/graphql';
import { PostCreateWithoutAuthorInput } from './post-create-without-author.input';
import { PostWhereUniqueInput } from './post-where-unique.input';
import { PostUpdateWithWhereUniqueWithoutAuthorInput } from './post-update-with-where-unique-without-author.input';
import { PostUpdateManyWithWhereNestedInput } from './post-update-many-with-where-nested.input';
import { PostScalarWhereInput } from './post-scalar-where.input';
import { PostUpsertWithWhereUniqueWithoutAuthorInput } from './post-upsert-with-where-unique-without-author.input';

@InputType({})
export class PostUpdateManyWithoutAuthorInput {

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

    @Field(() => [PostWhereUniqueInput], {
            nullable: true,
            description: undefined
        })
    set?: PostWhereUniqueInput | PostWhereUniqueInput[] | null;

    @Field(() => [PostWhereUniqueInput], {
            nullable: true,
            description: undefined
        })
    disconnect?: PostWhereUniqueInput | PostWhereUniqueInput[] | null;

    @Field(() => [PostWhereUniqueInput], {
            nullable: true,
            description: undefined
        })
    delete?: PostWhereUniqueInput | PostWhereUniqueInput[] | null;

    @Field(() => [PostUpdateWithWhereUniqueWithoutAuthorInput], {
            nullable: true,
            description: undefined
        })
    update?: PostUpdateWithWhereUniqueWithoutAuthorInput | PostUpdateWithWhereUniqueWithoutAuthorInput[] | null;

    @Field(() => [PostUpdateManyWithWhereNestedInput], {
            nullable: true,
            description: undefined
        })
    updateMany?: PostUpdateManyWithWhereNestedInput | PostUpdateManyWithWhereNestedInput[] | null;

    @Field(() => [PostScalarWhereInput], {
            nullable: true,
            description: undefined
        })
    deleteMany?: PostScalarWhereInput | PostScalarWhereInput[] | null;

    @Field(() => [PostUpsertWithWhereUniqueWithoutAuthorInput], {
            nullable: true,
            description: undefined
        })
    upsert?: PostUpsertWithWhereUniqueWithoutAuthorInput | PostUpsertWithWhereUniqueWithoutAuthorInput[] | null;
}
