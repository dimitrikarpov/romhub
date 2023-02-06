import { Playlist } from "@prisma/client"

export const getUserPlaylistsContainsRom = ({
  romId,
}: {
  romId: string
}): Promise<Playlist[]> => {
  return fetch(
    ["/api/playlists/contains-rom", new URLSearchParams({ romId })].join("?"),
  ).then((res) => res.json())
}
