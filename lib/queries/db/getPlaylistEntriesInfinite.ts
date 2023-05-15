import { convertEntity } from "~/lib/convertEntity"
import prisma from "~/lib/prismadb"

export type GetPlaylistEntriesInfinite = {
  params: Parameters<typeof getPlaylistEntriesInfinite>[0]
  data: Awaited<ReturnType<typeof getPlaylistEntriesInfinite>>
}

export const getPlaylistEntriesInfinite = async ({
  playlistId,
  take = 15,
  cursor = "",
}: {
  playlistId: string
  take?: number
  cursor?: string
}) => {
  const cursorObj = cursor === "" ? undefined : { id: cursor as string }

  const data = await prisma.playlistEntry.findMany({
    where: { playlistId: playlistId as string },
    include: { rom: true, playlist: true },
    orderBy: { assignedAt: "desc" },
    take: take,
    skip: cursor !== "" ? 1 : 0,
    cursor: cursorObj,
  })

  return {
    nextCursor: data.length === take ? data[take - 1].id : undefined,
    data: data.map((item) => ({
      ...item,
      rom: convertEntity.rom.toUiRom(item.rom),
    })),
  }
}
