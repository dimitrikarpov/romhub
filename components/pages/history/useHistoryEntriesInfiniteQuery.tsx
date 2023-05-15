import { useInfiniteQuery } from "react-query"
import superjson from "superjson"
import type { GetPlaylistEntriesInfinite } from "~/lib/queries/db/getPlaylistEntriesInfinite"

export const useHistoryEntriesInfiniteQuery = (playlistId: string) => {
  return useInfiniteQuery<GetPlaylistEntriesInfinite["data"]>({
    queryKey: ["history"],
    queryFn: async ({ pageParam = "" }) =>
      fetchHistoryEntriesInfinite(playlistId, pageParam),
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? false,
  })
}

const fetchHistoryEntriesInfinite = async (
  playlistId: string,
  pageParam: string,
) => {
  const response = await fetch(
    `/api/playlists/entries/infinite?${new URLSearchParams({
      cursor: pageParam,
      playlistId,
    })}`,
  )
  const data = await response.json()

  return superjson.parse(data) as GetPlaylistEntriesInfinite["data"]
}
