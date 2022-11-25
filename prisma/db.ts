import { PrismaClient } from "@prisma/client"
// import { createPrismaQueryEventHandler } from "prisma-query-log"

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

export const prisma = new PrismaClient({
  log: [
    {
      level: "query",
      emit: "event",
    },
  ],
})

// const log = createPrismaQueryEventHandler()

// prisma.$on("query", log)

if (process.env.NODE_ENV !== "production") global.prisma = prisma
