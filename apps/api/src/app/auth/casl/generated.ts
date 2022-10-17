import { Subjects } from '@casl/prisma';
import { 
  Product,
  Review,
  User,
} from '@prisma/client';

export type PrismaSubjects = Subjects<{
  Product: Product;
  Review: Review;
  User: User;
}>;
