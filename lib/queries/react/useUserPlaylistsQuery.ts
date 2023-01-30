import { useQuery } from "react-query"
import { apiQueries } from "@/lib/queries/apiQueries"

export const useUserPlaylistsQuery = (
  userId?: string,
  enabled: boolean = true,
) => {
  const query = useQuery({
    queryKey: ["playlists"],
    queryFn: () => apiQueries.getUserPlaylists({ userId: userId as string }),
    enabled: Boolean(userId) && enabled,
    staleTime: 5 * 60 * 1000,
  })

  return query
}
