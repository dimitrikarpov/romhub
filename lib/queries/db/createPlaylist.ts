import prisma from "@/lib/prismadb"
import { TCreatePlaylistFormData } from "@/types/index"

export const createPlaylist = async (data: TCreatePlaylistFormData) => {
  const playlist = await prisma.playlist.create({
    data: {
      type: String(data.type),
      title: data.title,
      isPublic: data.isPublic,
      authorId: data.userId,
    },
  })

  await prisma.playlistsOnUsers.create({
    data: { userId: data.userId, playlistId: playlist.id },
  })

  return playlist
}
