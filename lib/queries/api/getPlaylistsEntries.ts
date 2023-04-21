import { ConvertDatePropToString } from "~/types/utils"
import { Playlist, PlaylistEntry, Rom } from "@prisma/client"

type PlaylistEntryWithRomAndPlaylist =
  ConvertDatePropToString<PlaylistEntry> & {
    rom: ConvertDatePropToString<Rom>
    playlist: ConvertDatePropToString<Playlist>
  }

export const getPlaylistsEntries = ({
  playlistId,
}: {
  playlistId: string
}): Promise<{
  total: number
  data: Array<PlaylistEntryWithRomAndPlaylist>
}> => {
  return fetch(
    ["/api/playlists/entries", new URLSearchParams({ playlistId })].join("?"),
  ).then((res) => res.json())
}
