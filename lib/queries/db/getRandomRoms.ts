import { Rom } from "@prisma/client"
import prisma from "~/lib/prismadb"
import { convertEntity } from "~/lib/convertEntity"

export type GetRandomRoms = {
  params: Parameters<typeof getRandomRoms>[0]
  data: Awaited<ReturnType<typeof getRandomRoms>>
}

export const getRandomRoms = async ({ take = 6 }: { take?: number }) => {
  const result: Rom[] =
    await prisma.$queryRaw`SELECT * FROM Rom ORDER BY RANDOM() LIMIT ${take};`

  return result.map(convertEntity.rom.toUiRom)
}
