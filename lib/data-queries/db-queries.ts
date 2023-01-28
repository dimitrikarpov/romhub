import prisma from "@/lib/prismadb"
import { TCreatePlaylistFormData } from "@/types/index"

const fetchPlaylistById = async (id: string) => {
  const playlist = await prisma.playlist.findFirst({
    where: { id },
  })

  return playlist
}

const findPlaylistByUser = async (userId: string) => {
  const found = await prisma.playlist.findMany({
    where: { users: { every: { userId } } },
  })

  return found

  // const found = await prisma.playlistsOnUsers.findMany({
  //   where: { userId },
  //   include: { playlist: true },
  // })

  // return found?.map(({ playlist }) => playlist)

  // const playlists = await prisma.playlist.findMany({
  //   where: { userId },
  // })

  // return playlists
}

const findPlaylistByUserAndRom = async (userId: string, romId: string) => {
  const found = await prisma.playlist.findMany({
    where: {
      AND: [{ entries: { some: { romId } } }, { users: { some: { userId } } }],
      NOT: [{ type: "history" }],
    },
  })

  return found

  // const playlists = await prisma.playlist.findMany({
  //   where: {
  //     AND: [{ entries: { some: { romId: String(romId) } } }, { userId }],
  //     NOT: [{ type: "history" }],
  //   },
  // })

  // return playlists
}

const createPlaylist = async (data: TCreatePlaylistFormData) => {
  const playlist = await prisma.playlist.create({
    data: {
      type: String(data.type),
      title: data.title,
      isPublic: data.isPublic,
      authorId: data.userId,
    },
  })

  const playlistOnUsers = await prisma.playlistsOnUsers.create({
    data: { userId: data.userId, playlistId: playlist.id },
  })

  return playlist
}

const fetchPlaylistsEntries = async (playlistId: string) => {
  const found = await prisma.playlist.findFirst({
    where: { id: playlistId },
    include: {
      entries: {
        include: {
          rom: true,
        },
      },
    },
  })

  return found
}

const createPlaylistEntry = async (playlistId: string, romId: string) => {
  const playlist = await prisma.playlist.findUnique({
    where: { id: String(playlistId) },
  })

  if (!playlist) return

  const rom = await prisma.rom.findFirst({ where: { id: String(romId) } })

  if (!rom) return

  const result = await prisma.playlist.update({
    where: {
      id: playlistId,
    },
    include: {
      entries: true,
    },
    data: {
      entries: {
        create: { romId: romId },
      },
    },
  })

  return result
}

const deletePlaylistEntryByRom = async (playlistId: string, romId: string) => {
  const playlist = await prisma.playlist.findUnique({
    where: { id: playlistId },
  })

  if (!playlist) return

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

export const dbQueries = {
  fetchPlaylistById,
  createPlaylist,
  findPlaylistByUser,
  findPlaylistByUserAndRom,
  fetchPlaylistsEntries,
  createPlaylistEntry,
  deletePlaylistEntryByRom,
}
