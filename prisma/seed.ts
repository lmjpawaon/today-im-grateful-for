import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
      // Seed diary entries
      await prisma.journalEntry.create({
        data: 
          { title: 'My First Entry',content: 'First entry for day 1'},
      });
  
      console.log('Data seeding successful');
  }

  seed()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })