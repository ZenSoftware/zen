import { Subjects } from '@casl/prisma';
import { 
  User,
} from '../../prisma';

export type PrismaSubjects = Subjects<{
  User: User;
}>;
