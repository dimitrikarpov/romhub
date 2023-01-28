import { useQuery } from "react-query"
import { apiQueries } from "@/lib/data-queries/api-queries"

export const usePlaylistsQuery = (userId?: string, enabled: boolean = true) => {
  const playlistsQuery = useQuery({
    queryKey: ["playlists"],
    queryFn: () => apiQueries.findPlaylistByUser({ userId: userId as string }),
    enabled: Boolean(userId) && enabled,
    staleTime: 5 * 60 * 1000,
  })

  return playlistsQuery
}
