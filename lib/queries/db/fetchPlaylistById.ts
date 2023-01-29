import prisma from "@/lib/prismadb"

export const fetchPlaylistById = async (id: string) => {
  const playlist = await prisma.playlist.findFirst({
    where: { id },
  })

  return playlist
}
