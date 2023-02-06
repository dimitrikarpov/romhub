import { useQuery } from "react-query"
import { apiQueries } from "@/lib/queries/apiQueries"

export const useUserPlaylistsQuery = ({
  enabled = true,
}: {
  enabled?: boolean
}) => {
  const query = useQuery({
    queryKey: ["playlists"],
    queryFn: () => apiQueries.getUserPlaylists(),
    enabled,
    staleTime: 5 * 60 * 1000,
  })

  return query
}
