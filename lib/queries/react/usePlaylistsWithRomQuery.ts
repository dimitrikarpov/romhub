import { useQuery } from "react-query"
import { apiQueries } from "@/lib/queries/apiQueries"

export const usePlaylistWithRomQuery = ({
  romId,
  enabled = true,
}: {
  romId?: string
  enabled?: boolean
}) => {
  const query = useQuery({
    queryKey: ["contains-rom", { romId }],
    queryFn: () =>
      apiQueries.getUserPlaylistsContainsRom({
        romId: romId as string,
      }),
    enabled: Boolean(romId) && enabled,
  })

  return query
}
