import { useInfiniteQuery } from "react-query"
import superjson from "superjson"
import type { GetPlaylistsEntries } from "~/lib/queries/db/getPlaylistsEntries"

export const usePlaylistEntriesInfiniteQuery = (playlistId: string) => {
  return useInfiniteQuery<GetPlaylistsEntries["data"]>({
    queryKey: ["playlist", { playlistId }],
    queryFn: async ({ pageParam = "" }) =>
      fetchPlaylistEntriesInfinite(playlistId, pageParam),
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? false,
  })
}

const fetchPlaylistEntriesInfinite = async (
  playlistId: string,
  pageParam: string,
) => {
  const response = await fetch(
    `/api/playlists/entries?${new URLSearchParams({
      cursor: pageParam,
      playlistId,
      take: "10",
    })}`,
  )
  const data = await response.json()

  console.log({ data })

  return superjson.parse(data) as GetPlaylistsEntries["data"]
}
