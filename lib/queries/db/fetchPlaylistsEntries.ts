import prisma from "@/lib/prismadb"

export const fetchPlaylistsEntries = async (playlistId: string) => {
  const found = await prisma.playlist.findFirst({
    where: { id: playlistId },
    include: {
      entries: {
        include: {
          rom: true,
        },
      },
    },
  })

  return found
}
