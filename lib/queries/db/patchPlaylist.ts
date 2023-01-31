import prisma from "@/lib/prismadb"

// TODO: refactor input params to {id, data}

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
      ...(isPublic && { isPublic }),
    },
  })

  return playlist
}
