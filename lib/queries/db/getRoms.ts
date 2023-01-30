import { Prisma } from "@prisma/client"
import prisma from "@/lib/prismadb"
import { convertEntity } from "@/lib/convertEntity"

export const getRoms = async ({
  skip = 0,
  take = 15,
  where,
}: {
  skip: number
  take: number
  where?: Prisma.RomWhereInput | undefined
}) => {
  let total = 0
  let data = []

  try {
    total = await prisma.rom.count(where ? { where } : undefined)
    data = await prisma.rom.findMany({
      ...(skip && { skip: Number(skip) }),
      ...(take && { take: Number(take) }),
      ...(where && { where }),
    })
  } catch (e) {
    throw new Error("Bad request")
  }

  // TODO: convert to UiRom here

  return { total, data: data.map(convertEntity.rom.toUiRom) }
}
