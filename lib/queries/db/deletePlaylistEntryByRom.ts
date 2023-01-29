import prisma from "@/lib/prismadb"

export const deletePlaylistEntryByRom = async (
  playlistId: string,
  romId: string,
) => {
  const playlist = await prisma.playlist.findUnique({
    where: { id: playlistId },
  })

  if (!playlist) return

  const rom = await prisma.rom.findFirst({
    where: { id: romId },
  })

  if (!rom) return

  const result = await prisma.playlistEntry.deleteMany({
    where: {
      AND: [{ playlistId }, { romId }],
    },
  })

  return result
}
