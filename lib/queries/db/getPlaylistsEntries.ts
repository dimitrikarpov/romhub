import prisma from "@/lib/prismadb"

// TODO: does it used through apiQuery ??
export const getPlaylistsEntries = async (playlistId: string) => {
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
