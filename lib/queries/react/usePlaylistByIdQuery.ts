import { useQuery } from "react-query"
import { apiQueries } from "@/lib/queries/apiQueries"

type initialData = Awaited<ReturnType<typeof apiQueries.getPlaylistById>>

export const usePlaylistByIdQuery = ({
  id,
  enabled = true,
  initialData,
}: {
  id?: string
  enabled?: boolean
  initialData?: initialData
}) => {
  const query = useQuery({
    queryKey: ["playlist", { id }],
    queryFn: () => apiQueries.getPlaylistById({ id: id as string }),
    enabled: Boolean(id) && enabled,
    initialData,
  })

  return query
}
