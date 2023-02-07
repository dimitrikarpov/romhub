import { useQuery } from "react-query"
import { apiQueries } from "@/lib/queries/apiQueries"

type initialData = Awaited<ReturnType<typeof apiQueries.getPlaylistsEntries>>

export const usePlaylistEntriesQuery = ({
  id,
  enabled = true,
  initialData,
}: {
  id?: string
  enabled?: boolean
  initialData?: initialData
}) => {
  const query = useQuery({
    queryKey: ["playlist-entries", { id }],
    queryFn: () => apiQueries.getPlaylistsEntries({ playlistId: id as string }),
    enabled: Boolean(id) && enabled,
    initialData,
  })

  return query
}
