import { Playlist, User } from "@prisma/client"

export const getPlaylistById = ({
  id,
}: {
  id: string
}): Promise<
  Playlist & {
    author: User
  }
> => {
  return fetch(`/api/playlists/${id}`).then((res) => res.json())
}
