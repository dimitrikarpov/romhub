import { Playlist } from "@prisma/client"
import { Session } from "next-auth"
import prisma from "@/lib/prismadb"

export const saveSharedPlaylistToLibrary = async (
  session: Session,
  playlistId: string,
) => {
  const playlist = await prisma.playlist.findUnique({
    where: { id: playlistId },
  })

  if (!playlist || !caSaveSharedPlaylist(playlist, session)) return

  const result = await prisma.playlistsOnUsers.upsert({
    where: {
      userId_playlistId: {
        userId: session.user.id as string,
        playlistId,
      },
    },
    update: {},
    create: {
      userId: session.user.id as string,
      playlistId: playlist.id,
    },
  })

  return result
}

// TODO: [permisson]
const caSaveSharedPlaylist = (playlist: Playlist, session: Session | null) => {
  return (
    session?.user.id !== playlist.authorId &&
    playlist.isPublic &&
    playlist.type === "custom"
  )
}
