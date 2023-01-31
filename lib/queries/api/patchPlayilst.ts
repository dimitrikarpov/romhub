import { Playlist } from "@prisma/client"

type data = {
  title?: string
  description?: string
  isPublic?: boolean
}

export const patchPlaylist = ({
  id,
  data,
}: {
  id: string
  data: data
}): Promise<Playlist> => {
  return fetch(`/api/playlists/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json())
}
