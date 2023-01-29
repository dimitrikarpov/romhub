import { Playlist } from "@prisma/client"

export const findUserPlaylistsContainsRom = ({
  userId,
  romId,
}: {
  userId: string
  romId: string
}): Promise<Playlist[]> => {
  return fetch(
    [
      "/api/playlists/find-by-user-and-rom",
      new URLSearchParams({ userId, romId }),
    ].join("?"),
  ).then((res) => res.json())
}
