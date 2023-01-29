import { Playlist } from "@prisma/client"

export const findUserPlaylists = ({
  userId,
}: {
  userId: string
}): Promise<Playlist[]> => {
  return fetch(
    ["/api/playlists", new URLSearchParams({ userId })].join("?"),
  ).then((res) => res.json())
}
