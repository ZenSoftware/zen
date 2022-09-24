import { Subjects } from '@casl/prisma';
import { 
  User,
} from '@prisma/client';

export type PrismaSubjects = Subjects<{
  User: User;
}>;
