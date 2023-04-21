import { Playlist } from "@prisma/client"
import { TPlaylistType } from "~/types/index"

export const createPlaylistEntry = ({
  playlistId,
  romId,
}: {
  playlistId: string
  romId: string
}) => {
  return fetch(
    ["/api/playlists/entries", new URLSearchParams({ playlistId, romId })].join(
      "?",
    ),
    { method: "POST" },
  )
}
