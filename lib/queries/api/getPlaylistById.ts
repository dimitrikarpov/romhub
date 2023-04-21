import { Playlist, User } from "@prisma/client"
import { ConvertDatePropToString } from "~/types/utils"

type PlaylistWithAuthor = ConvertDatePropToString<Playlist> & {
  author: ConvertDatePropToString<User>
}

export const getPlaylistById = ({
  id,
}: {
  id: string
}): Promise<PlaylistWithAuthor> => {
  return fetch(`/api/playlists/${id}`).then((res) => res.json())
}
