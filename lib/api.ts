import { Playlist } from "@prisma/client"
import { UiRom, TPlaylistType } from "@/types/index"

type fetchRomsParams = {
  skip?: number
  take?: number
  platform?: string
  titleStartsWith?: string
}

type fetchRomsData = {
  data: UiRom[]
  total: number
  take: number
  skip: number
}

const fetchRoms = ({
  skip = 0,
  take = pageSize,
  platform = "all",
  titleStartsWith,
}: fetchRomsParams): Promise<fetchRomsData> =>
  fetch(
    "/api/roms" +
      "?" +
      new URLSearchParams({
        skip: String(skip),
        take: String(take),
        ...(platform !== "all" && {
          where: createWhereContainseQueryString("platform", platform),
        }),
        ...(titleStartsWith && {
          where: createWhereStartsWithQueryString("name", titleStartsWith),
        }),
      }),
  ).then((res) => res.json())

const pageSize = 15

const createWhereContainseQueryString = (key: string, value: string) => {
  return JSON.stringify({ [key]: { contains: value } })
}

const createWhereStartsWithQueryString = (key: string, value: string) => {
  return JSON.stringify({ [key]: { startsWith: value } })
}

const fetchPlaylists = (): Promise<Playlist[]> =>
  fetch("/api/playlists").then((res) => res.json())

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

const fetchUserPlaylists = ({
  userId,
}: {
  userId: string
}): Promise<Playlist[]> =>
  fetch("/api/user/playlists" + "?" + new URLSearchParams({ userId })).then(
    (res) => res.json(),
  )

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

const deletePlaylistEntryByRomId = ({
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

const fetchUserPlaylistsWithRom = ({
  userId,
  romId,
}: {
  userId: string
  romId: string
}): Promise<Playlist[]> =>
  fetch(
    "/api/user/playlists/with-rom" +
      "?" +
      new URLSearchParams({ userId, romId }),
  ).then((res) => res.json())

export const api = {
  roms: { findMany: fetchRoms, getById: null },
  playlists: {
    findMany: fetchPlaylists, // TODO: looks like not used
    create: createPlaylist,
  },
  playlistEntries: {
    create: createPlaylistEntry,
    deleteByRomId: deletePlaylistEntryByRomId,
  },
  user_playlists: {
    findMany: fetchUserPlaylists,
    withRom: fetchUserPlaylistsWithRom,
  },
}
