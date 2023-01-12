import { useQuery } from "react-query"
import { api } from "../../lib/api"

export const usePlaylistsQuery = (userId?: string, enabled: boolean = true) => {
  const playlistsQuery = useQuery({
    queryKey: ["playlists"],
    queryFn: () => api.user_playlists.findMany({ userId: String(userId) }),
    enabled: Boolean(userId) && enabled,
    staleTime: 5 * 60 * 1000,
  })

  return playlistsQuery
}
