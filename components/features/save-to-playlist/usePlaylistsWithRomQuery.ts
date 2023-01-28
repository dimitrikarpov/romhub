import { useQuery } from "react-query"
import { apiQueries } from "@/lib/data-queries/api-queries"

export const usePlaylistWithRomQuery = (
  userId?: string,
  romId?: string,
  enabled: boolean = true,
) => {
  const query = useQuery({
    queryKey: ["playlists-with-rom", { userId, romId }],
    queryFn: () =>
      apiQueries.findPlaylistByUserAndRom({
        userId: userId as string,
        romId: romId as string,
      }),
    enabled: Boolean(userId) && Boolean(romId) && enabled,
  })

  return query
}
