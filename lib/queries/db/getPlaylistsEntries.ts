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
}: {
  playlistId: string
  skip?: number
  take?: number
  orderBy?: Prisma.PlaylistEntryOrderByWithAggregationInput | undefined
}) => {
  let total = 0
  let data = []

  total = await prisma.playlistEntry.count({ where: { playlistId } })
  data = await prisma.playlistEntry.findMany({
    ...(skip && { skip: Number(skip) }),
    ...(take && { take: Number(take) }),
    ...(orderBy && { orderBy }),
    where: { playlistId: playlistId },
    include: { rom: true, playlist: true },
  })

  return {
    total,
    data: data.map((item) => ({
      ...item,
      rom: convertEntity.rom.toUiRom(item.rom),
    })),
  }
}
