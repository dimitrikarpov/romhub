import { convertEntity } from "~/lib/convertEntity"
import prisma from "~/lib/prismadb"

export const getPlaylistById = async (id: string) => {
  const playlist = await prisma.playlist.findFirst({
    where: { id },
    include: { author: true },
  })

  if (!playlist) throw new Error("aa")

  return {
    ...playlist,
    ...convertEntity.playlist.serializeDates(playlist),
    author: convertEntity.user.serializeDates(playlist.author),
  }
}
