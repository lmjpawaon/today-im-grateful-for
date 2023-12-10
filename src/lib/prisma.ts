import { PrismaClient } from "@prisma/client";

// Create a global object to store the Prisma client instance
const globalForPrisma: { prisma?: PrismaClient } = {};

// Initialize and export the Prisma client
export const prisma = globalForPrisma.prisma || new PrismaClient({
  log: ["query"],
});

// Only store the Prisma client in the global object if not in production
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Cleanup function to disconnect the Prisma client when the Node.js process is about to exit
process.on('beforeExit', () => {
  prisma.$disconnect();
});
