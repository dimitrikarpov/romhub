import prisma from "@/lib/prismadb"

export const createPlaylistEntry = async (
  playlistId: string,
  romId: string,
) => {
  const playlist = await prisma.playlist.findUnique({
    where: { id: String(playlistId) },
  })

  if (!playlist) return

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
