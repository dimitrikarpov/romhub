import { Session } from "next-auth"
import { Playlist } from "@prisma/client"
import prisma from "~/lib/prismadb"

export const deletePlaylist = async (playlistId: string, session: Session) => {
  const playlist = await prisma.playlist.findUnique({
    where: { id: playlistId },
  })

  if (!playlist) return

  if (!canDeleteOwnPlaylist(session, playlist)) return

  const result = await prisma.playlist.delete({ where: { id: playlistId } })

  return result
}

// TODO: [permisson]
const canDeleteOwnPlaylist = (session: Session | null, playlist: Playlist) => {
  return (
    session &&
    session.user.id === playlist.authorId &&
    playlist.type === "custom"
  )
}
