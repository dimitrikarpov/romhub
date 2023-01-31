import prisma from "@/lib/prismadb"

export const getPlaylistById = async (id: string) => {
  const playlist = await prisma.playlist.findFirst({
    where: { id },
    include: { author: true },
  })

  return playlist
}
