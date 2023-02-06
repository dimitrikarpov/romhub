import { Playlist } from "@prisma/client"

export const getUserPlaylists = (): Promise<Playlist[]> => {
  return fetch("/api/playlists").then((res) => res.json())
}
