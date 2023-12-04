import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
      // Seed some days
      console.log('Creating days...');
      const day1 = await prisma.day.create({
        data: { date: new Date('2023-12-01') },
      });
  
      const day2 = await prisma.day.create({
        data: { date: new Date('2023-12-02') },
      });
  
      // Seed diary entries
      await prisma.journalEntry.create({
        data: 
          { content: 'First entry for day 1', dayId: day1.id },
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