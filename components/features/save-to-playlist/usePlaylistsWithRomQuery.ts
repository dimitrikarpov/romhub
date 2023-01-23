import { api } from "@/lib/api"
import { useQuery } from "react-query"

export const usePlaylistWithRomQuery = (
  userId?: string,
  romId?: string,
  enabled: boolean = true,
) => {
  const query = useQuery({
    queryKey: ["playlists-with-rom", { userId, romId }],
    queryFn: () =>
      api.user_playlists.withRom({
        userId: String(userId),
        romId: String(romId),
      }),
    enabled: Boolean(userId) && Boolean(romId) && enabled,
  })

  return query
}
