import { Prisma } from "@prisma/client"
import { UiRom } from "@/types/index"

type fetchRomsData = {
  data: UiRom[]
  total: number
  take: number
  skip: number
}

export const getRoms = async ({
  skip = 0,
  take = 15,
  where,
}: {
  skip: number
  take: number
  where: Prisma.RomWhereInput | undefined
}): Promise<fetchRomsData> => {
  return fetch(
    [
      "/api/roms",
      new URLSearchParams({
        ...(skip && { skip: String(skip) }),
        ...(take && { take: String(take) }),
        ...(where && { where: JSON.stringify(where) }),
      }),
    ].join("?"),
  ).then((res) => res.json())
}
