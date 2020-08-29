import { InputType, Field } from '@nestjs/graphql';
import { PostUpdateManyWithoutAuthorInput } from '../post/post-update-many-without-author.input';

@InputType({})
export class UserUpdateWithoutProfileDataInput {

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

    @Field(() => PostUpdateManyWithoutAuthorInput, {
            nullable: true,
            description: undefined
        })
    posts?: PostUpdateManyWithoutAuthorInput | null;
}
