import prisma from "~/lib/prismadb"
import { TCreatePlaylistFormData } from "~/types/index"

export const createPlaylist = async (
  authorId: string,
  data: TCreatePlaylistFormData,
) => {
  const playlist = await prisma.playlist.create({
    data: {
      type: String(data.type),
      title: data.title,
      isPublic: data.isPublic,
      authorId: authorId,
    },
  })

  await prisma.playlistsOnUsers.create({
    data: { userId: authorId, playlistId: playlist.id },
  })

  return playlist
}
