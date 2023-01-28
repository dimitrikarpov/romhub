import { useQuery } from "react-query"
import { apiQueries } from "@/lib/queries/api-queries"

export const usePlaylistWithRomQuery = (
  userId?: string,
  romId?: string,
  enabled: boolean = true,
) => {
  const query = useQuery({
    queryKey: ["playlists-with-rom", { userId, romId }],
    queryFn: () =>
      apiQueries.findUserPlaylistsContainsRom({
        userId: userId as string,
        romId: romId as string,
      }),
    enabled: Boolean(userId) && Boolean(romId) && enabled,
  })

  return query
}
