import {PrismaClient} from "@prisma/client";
import Chance from 'chance'

const client = new PrismaClient()
var chance = new Chance();

async function seed() {
  for (let i = 0; i < 1; i++) {
    await client.user.create({
      data: {
        id: i,
        createdAt: chance.date(),
        username: chance.name(),
        password: chance.word(),
        email: chance.email(),
        roles: ["Super"],
      }
    })
  }
}

seed()