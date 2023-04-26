import prisma from "~/lib/prismadb"
import { TCreatePlaylistFormData } from "~/types/index"

export type TCreatePlaylistParams = Parameters<typeof createPlaylist>[0]
export type TCreatePlaylistReturn = ReturnType<typeof createPlaylist>

export const createPlaylist = async ({
  authorId,
  data,
}: {
  authorId: string
  data: TCreatePlaylistFormData
}) => {
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
