import { Rom } from "@prisma/client"
import prisma from "@/lib/prismadb"
import { convertEntity } from "@/lib/convertEntity"

export const getRandomRoms = async (limit = 5) => {
  const result: Rom[] =
    await prisma.$queryRaw`SELECT * FROM Rom ORDER BY RANDOM() LIMIT ${limit};`

  return result.map(convertEntity.rom.toUiRom)
}
