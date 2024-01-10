import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
}

declare global {
  var prisma: PrismaClient | undefined;
}

export const client = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV === "production") {
  globalThis.prisma = client;
}
