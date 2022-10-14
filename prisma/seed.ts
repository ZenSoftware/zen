import {PrismaClient} from "@prisma/client";
import Chance from 'chance'

const client = new PrismaClient()
var chance = new Chance();

async function seed() {
  for (let i = 0; i < 10; i++) {
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
    await client.review.create({
      data: {
        id: i,    
        product_id: 1,
        score: i
      }
    })
    await client.product.create({
      data: {
        id: i
      }
    })
  }
}

seed()