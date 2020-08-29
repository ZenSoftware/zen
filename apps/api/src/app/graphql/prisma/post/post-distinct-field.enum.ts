import { registerEnumType } from '@nestjs/graphql';

export enum PostDistinctFieldEnum {
    id = "id",
    createdAt = "createdAt",
    title = "title",
    content = "content",
    published = "published",
    authorId = "authorId"
}

registerEnumType(PostDistinctFieldEnum, { name: 'PostDistinctFieldEnum', description: undefined })
