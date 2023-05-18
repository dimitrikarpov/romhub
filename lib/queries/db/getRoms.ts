import { Prisma } from "@prisma/client"
import prisma from "~/lib/prismadb"
import { convertEntity } from "~/lib/convertEntity"

export type GetRoms = {
  params: Parameters<typeof getRoms>[0]
  data: Awaited<ReturnType<typeof getRoms>>
}

export const getRoms = async ({
  skip = 0,
  take = 15,
  where,
  orderBy,
  cursor,
}: {
  skip?: number
  take?: number
  where?: Prisma.RomWhereInput | undefined
  orderBy?: Prisma.RomOrderByWithAggregationInput[] | undefined
  cursor?: string
}) => {
  let total: number | undefined = undefined
  let cursorObj: { id: string } | undefined = undefined

  const paginationType = typeof cursor === "string" ? "cursor" : "offset"

  if (paginationType === "offset") {
    total = await prisma.rom.count(where ? { where } : undefined)
  }

  if (paginationType === "cursor") {
    cursorObj = cursor === "" ? undefined : { id: cursor as string }
  }

  const data = await prisma.rom.findMany({
    ...(take && { take: Number(take) }),
    ...(where && { where }),
    ...(orderBy && { orderBy }),
    ...(paginationType === "offset" && { skip: Number(skip) }),
    ...(paginationType === "cursor" && {
      cursor: cursorObj,
      skip: cursor === "" ? 0 : 1,
    }),
  })

  return {
    ...(paginationType === "offset" && { total }),
    ...(paginationType === "cursor" && {
      nextCursor: data.length === take ? data[take - 1].id : undefined,
    }),
    data: data.map(convertEntity.rom.toUiRom),
  }
}
