import { useQuery } from "react-query"
import { api } from "../../lib/api"

export const usePlaylistsQuery = (userId?: string) => {
  const playlistsQuery = useQuery({
    queryKey: ["playlists"],
    queryFn: () => api.user_playlists.findMany({ userId: String(userId) }),
    enabled: Boolean(userId),
  })

  return playlistsQuery
}
