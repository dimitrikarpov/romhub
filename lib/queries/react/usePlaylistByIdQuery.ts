import { useQuery } from "react-query"
import { apiQueries } from "@/lib/queries/apiQueries"
import { convertEntity } from "@/lib/convertEntity"

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
    select: transformData,
  })

  return query
}

const transformData = (data: initialData) => {
  return {
    ...data,
    ...convertEntity.playlist.unserializeDates(data),
    author: convertEntity.user.unserializeDates(data.author),
  }
}
