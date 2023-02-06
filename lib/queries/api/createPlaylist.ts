import { TCreatePlaylistFormData, TPlaylistType } from "@/types/index"

export const createPlaylist = ({ data }: { data: TCreatePlaylistFormData }) => {
  const { title, type = "custom", isPublic = false } = data

  return fetch("/api/playlists", {
    method: "POST",
    body: JSON.stringify({ type, title, isPublic }),
    headers: {
      "Content-Type": "application/json",
    },
  })
}
