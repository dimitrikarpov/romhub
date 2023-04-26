import prisma from "~/lib/prismadb"

export type TCreatePlaylistEntryParams = Parameters<
  typeof createPlaylistEntry
>[0]
export type TCreatePlaylistEntryReturn = ReturnType<typeof createPlaylistEntry>

export const createPlaylistEntry = async ({
  playlistId,
  romId,
}: {
  playlistId: string
  romId: string
}) => {
  const playlist = await prisma.playlist.findUnique({
    where: { id: String(playlistId) },
  })

  if (!playlist) return // TODO: [error handling] should we throw error?

  const rom = await prisma.rom.findFirst({ where: { id: String(romId) } })

  if (!rom) return

  const result = await prisma.playlist.update({
    where: {
      id: playlistId,
    },
    include: {
      entries: true,
    },
    data: {
      entries: {
        create: { romId: romId },
      },
    },
  })

  return result
}
