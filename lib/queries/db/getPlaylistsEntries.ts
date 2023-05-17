import { Prisma } from "@prisma/client"
import { convertEntity } from "~/lib/convertEntity"
import prisma from "~/lib/prismadb"

export type GetPlaylistsEntries = {
  params: Parameters<typeof getPlaylistsEntries>[0]
  data: Awaited<ReturnType<typeof getPlaylistsEntries>>
}

export const getPlaylistsEntries = async ({
  playlistId,
  skip = 0,
  take = 15,
  orderBy,
  cursor,
}: {
  playlistId: string
  take?: number
  orderBy?: Prisma.PlaylistEntryOrderByWithAggregationInput | undefined
  skip?: number
  cursor?: string
}) => {
  let total: number | undefined = undefined
  let cursorObj: { id: string } | undefined = undefined

  console.log(2, { cursor, take })

  const paginationType = typeof cursor === "string" ? "cursor" : "offset"

  if (paginationType === "offset") {
    total = await prisma.playlistEntry.count({
      where: { playlistId },
    })
  }

  if (paginationType === "cursor") {
    cursorObj = cursor === "" ? undefined : { id: cursor as string }
  }

  console.log(3, { paginationType, cursorObj })

  const data = await prisma.playlistEntry.findMany({
    where: { playlistId: playlistId },
    include: { rom: true, playlist: true },
    ...(orderBy && { orderBy }),
    ...(take && { take: Number(take) }),
    ...(paginationType === "offset" && { skip: Number(skip) }),
    ...(paginationType === "cursor" && { cursor: cursorObj }),
  })

  console.log(4, { data })

  return {
    ...(paginationType === "offset" && { total }),
    ...(paginationType === "cursor" && {
      nextCursor: data.length === take ? data[take - 1].id : undefined,
    }),
    data: data.map((item) => ({
      ...item,
      rom: convertEntity.rom.toUiRom(item.rom),
    })),
  }
}
