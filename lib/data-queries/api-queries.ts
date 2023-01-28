import { Playlist } from "@prisma/client"
import { TPlaylistType } from "@/types/index"

const findUserPlaylists = ({
  userId,
}: {
  userId: string
}): Promise<Playlist[]> =>
  fetch(["/api/playlists", new URLSearchParams({ userId })].join("?")).then(
    (res) => res.json(),
  )

const createPlaylist = ({
  userId,
  title,
  type = "custom",
  isPublic = false,
}: {
  type: TPlaylistType
  title: string
  isPublic: boolean
  userId: string
}) =>
  fetch("/api/playlists", {
    method: "POST",
    body: JSON.stringify({ type, title, isPublic, userId }),
    headers: {
      "Content-Type": "application/json",
    },
  })

const createPlaylistEntry = ({
  playlistId,
  romId,
}: {
  playlistId: string
  romId: string
}) =>
  fetch(
    ["/api/playlists/entries", new URLSearchParams({ playlistId, romId })].join(
      "?",
    ),
    { method: "POST" },
  )

const deletePlaylistEntryByRom = ({
  playlistId,
  romId,
}: {
  playlistId: string
  romId: string
}) =>
  fetch(
    [
      "/api/playlists/entries/delete-by-rom-id",
      new URLSearchParams({ playlistId, romId }),
    ].join("?"),
    { method: "DELETE" },
  )

const findUserPlaylistsContainsRom = ({
  userId,
  romId,
}: {
  userId: string
  romId: string
}): Promise<Playlist[]> =>
  fetch(
    [
      "/api/playlists/find-by-user-and-rom",
      new URLSearchParams({ userId, romId }),
    ].join("?"),
  ).then((res) => res.json())

export const apiQueries = {
  findUserPlaylists,
  createPlaylist,
  createPlaylistEntry,
  deletePlaylistEntryByRom,
  findUserPlaylistsContainsRom,
}
