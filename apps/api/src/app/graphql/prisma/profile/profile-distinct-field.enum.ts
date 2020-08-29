import { registerEnumType } from '@nestjs/graphql';

export enum ProfileDistinctFieldEnum {
    id = "id",
    bio = "bio",
    userId = "userId"
}

registerEnumType(ProfileDistinctFieldEnum, { name: 'ProfileDistinctFieldEnum', description: undefined })
