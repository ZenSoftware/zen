import { InputType, Field } from '@nestjs/graphql';

@InputType({})
export class PostUpdateWithoutAuthorDataInput {

    @Field(() => String, {
            nullable: true,
            description: undefined
        })
    createdAt?: string | null;

    @Field(() => String, {
            nullable: true,
            description: undefined
        })
    title?: string | null;

    @Field(() => String, {
            nullable: true,
            description: undefined
        })
    content?: string | null;

    @Field(() => Boolean, {
            nullable: true,
            description: undefined
        })
    published?: boolean | null;
}
