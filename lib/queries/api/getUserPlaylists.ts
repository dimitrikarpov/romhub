import { Playlist } from "@prisma/client"

export const getUserPlaylists = ({
  userId,
}: {
  userId: string
}): Promise<Playlist[]> => {
  return fetch(
    ["/api/playlists", new URLSearchParams({ userId })].join("?"),
  ).then((res) => res.json())
}
