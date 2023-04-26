import prisma from "~/lib/prismadb"

export type TPatchPlaylistParams = Parameters<typeof patchPlaylist>[0]
export type TPatchPlaylistReturn = ReturnType<typeof patchPlaylist>

export const patchPlaylist = async ({
  id,
  title,
  description,
  isPublic,
}: {
  id: string
  title?: string
  description?: string
  isPublic?: boolean
}) => {
  const playlist = await prisma.playlist.update({
    where: { id },
    data: {
      ...(title && { title }),
      ...(description && { description }),
      ...(isPublic !== undefined && { isPublic }),
    },
    include: { author: true },
  })

  return playlist
}
