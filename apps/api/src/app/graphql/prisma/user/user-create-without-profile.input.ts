import { InputType, Field } from '@nestjs/graphql';
import { PostCreateManyWithoutAuthorInput } from '../post/post-create-many-without-author.input';

@InputType({})
export class UserCreateWithoutProfileInput {

    @Field(() => String, {
            nullable: true,
            description: undefined
        })
    email?: string | null;

    @Field(() => String, {
            nullable: true,
            description: undefined
        })
    name?: string | null;

    @Field(() => PostCreateManyWithoutAuthorInput, {
            nullable: true,
            description: undefined
        })
    posts?: PostCreateManyWithoutAuthorInput | null;
}
