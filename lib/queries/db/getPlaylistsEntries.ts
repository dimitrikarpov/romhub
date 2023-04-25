import { convertEntity } from "~/lib/convertEntity"
import prisma from "~/lib/prismadb"

export type TPlaylistsEntriesReturn = ReturnType<typeof getPlaylistsEntries>
export type TPlaylistsEntriesParams = Parameters<typeof getPlaylistsEntries>[0]

export const getPlaylistsEntries = async ({
  playlistId,
  skip = 0,
  take = 15,
}: {
  playlistId: string
  skip?: number
  take?: number
}) => {
  let total = 0
  let data = []

  total = await prisma.playlistEntry.count({ where: { playlistId } })
  data = await prisma.playlistEntry.findMany({
    ...(skip && { skip: Number(skip) }),
    ...(take && { take: Number(take) }),
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
