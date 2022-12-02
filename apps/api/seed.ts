import { Prisma, PrismaClient } from './src/app/prisma';

const prisma = new PrismaClient();

async function main() {
  /** Seed data */
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
