import { registerEnumType } from '@nestjs/graphql';

export enum UserDistinctFieldEnum {
    id = "id",
    email = "email",
    name = "name"
}

registerEnumType(UserDistinctFieldEnum, { name: 'UserDistinctFieldEnum', description: undefined })
