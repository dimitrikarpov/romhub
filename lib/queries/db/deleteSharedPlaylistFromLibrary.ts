import { Playlist } from "@prisma/client"
import { Session } from "next-auth"
import prisma from "@/lib/prismadb"

export const deleteSharedPlaylistFromLibrary = async (
  session: Session,
  playlistId: string,
) => {
  const playlist = await prisma.playlist.findUnique({
    where: { id: playlistId },
  })

  if (!playlist || !canRemoveSharedPlaylistFromLibrary(playlist, session))
    return

  const result = await prisma.playlistsOnUsers.deleteMany({
    where: {
      AND: [{ playlistId }, { userId: session.user.id }],
    },
  })

  return result
}

// TODO: [permisson]
const canRemoveSharedPlaylistFromLibrary = (
  playlist: Playlist,
  session: Session | null,
) => session?.user.id !== playlist.authorId
