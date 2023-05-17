import { useInfiniteQuery } from "react-query"
import superjson from "superjson"
import type { GetPlaylistsEntries } from "~/lib/queries/db/getPlaylistsEntries"

export const useHistoryEntriesInfiniteQuery = (playlistId: string) => {
  return useInfiniteQuery<GetPlaylistsEntries["data"]>({
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
    `/api/playlists/entries?${new URLSearchParams({
      cursor: pageParam,
      playlistId,
    })}`,
  )
  const data = await response.json()

  console.log({ data })

  return superjson.parse(data) as GetPlaylistsEntries["data"]
}
