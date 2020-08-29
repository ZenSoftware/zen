import { InputType, Field } from '@nestjs/graphql';
import { ProfileWhereInput } from './profile-where.input';

@InputType({})
export class ProfileRelationFilter {

    @Field(() => ProfileWhereInput, {
            nullable: true,
            description: undefined
        })
    is?: ProfileWhereInput | null;

    @Field(() => ProfileWhereInput, {
            nullable: true,
            description: undefined
        })
    isNot?: ProfileWhereInput | null;
}
