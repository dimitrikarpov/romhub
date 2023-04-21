import { Session } from "next-auth"
import { Playlist } from "@prisma/client"
import prisma from "~/lib/prismadb"

export const deletePlaylistEntryByRom = async (
  playlistId: string,
  romId: string,
  session: Session,
) => {
  const playlist = await prisma.playlist.findUnique({
    where: { id: playlistId },
  })

  if (!playlist) return

  if (!canDeletePlaylistEntry(session, playlist)) return

  const rom = await prisma.rom.findFirst({
    where: { id: romId },
  })

  if (!rom) return

  const result = await prisma.playlistEntry.deleteMany({
    where: {
      AND: [{ playlistId }, { romId }],
    },
  })

  return result
}

// TODO [permission] should be playlist owner, should be registered
const canDeletePlaylistEntry = (
  session: Session | null,
  playlist: Playlist,
) => {
  return session && session.user.id === playlist.authorId
}
