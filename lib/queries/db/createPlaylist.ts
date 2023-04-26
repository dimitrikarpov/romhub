import prisma from "~/lib/prismadb"
import { TCreatePlaylistFormData } from "~/types/index"

export type CreatePlaylist = {
  params: Parameters<typeof createPlaylist>[0]
  data: Awaited<ReturnType<typeof createPlaylist>>
}

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
