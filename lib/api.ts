import { Playlist } from "@prisma/client"
import { Rom } from "../types"

type fetchRomsParams = {
  skip?: number
  take?: number
  platform?: string
  titleStartsWith?: string
}

type fetchRomsData = {
  data: Rom[]
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

export const api = {
  roms: { findMany: fetchRoms, getById: null },
  playlists: { findMany: fetchPlaylists, getById: null },
  playlistEntries: {
    findMany: null,
    getById: null,
    create: createPlaylistEntry,
    delete: null,
  },
  user_playlists: {
    findMany: fetchUserPlaylists,
  },
}
