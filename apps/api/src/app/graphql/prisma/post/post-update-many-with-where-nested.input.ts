import { InputType, Field } from '@nestjs/graphql';
import { PostScalarWhereInput } from './post-scalar-where.input';
import { PostUpdateManyDataInput } from './post-update-many-data.input';

@InputType({})
export class PostUpdateManyWithWhereNestedInput {

    @Field(() => PostScalarWhereInput, {
            nullable: true,
            description: undefined
        })
    where?: PostScalarWhereInput | null;

    @Field(() => PostUpdateManyDataInput, {
            nullable: true,
            description: undefined
        })
    data?: PostUpdateManyDataInput | null;
}
