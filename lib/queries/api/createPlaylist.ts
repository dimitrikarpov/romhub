import { TPlaylistType } from "@/types/index"

export const createPlaylist = ({
  userId,
  title,
  type = "custom",
  isPublic = false,
}: {
  type: TPlaylistType
  title: string
  isPublic: boolean
  userId: string
}) => {
  return fetch("/api/playlists", {
    method: "POST",
    body: JSON.stringify({ type, title, isPublic, userId }),
    headers: {
      "Content-Type": "application/json",
    },
  })
}
