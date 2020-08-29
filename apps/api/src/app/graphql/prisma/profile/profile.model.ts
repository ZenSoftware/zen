import { ObjectType, ID, Field, Int } from '@nestjs/graphql';
import { User } from '../user/user.model';

@ObjectType({
        description: undefined
    })
export class Profile {

    @Field(() => ID, {
            nullable: false,
            description: undefined
        })
    id!: number;

    @Field(() => String, {
            nullable: true,
            description: undefined
        })
    bio?: string | null;

    @Field(() => User, {
            nullable: false,
            description: undefined
        })
    user!: User;

    @Field(() => Int, {
            nullable: false,
            description: undefined
        })
    readonly userId!: number;
}
