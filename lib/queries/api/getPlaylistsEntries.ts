import { UiPlaylistEntry } from "@/types/index"

export const getPlaylistsEntries = ({
  playlistId,
}: {
  playlistId: string
}): Promise<UiPlaylistEntry[]> => {
  return fetch(
    ["/api/playlists/entries", new URLSearchParams({ playlistId })].join("?"),
  ).then((res) => res.json())
}
