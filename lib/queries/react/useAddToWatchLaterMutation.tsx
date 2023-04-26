import { useSession } from "next-auth/react"
import { useFetch, useGenericMutation } from "~/lib/fetcher"
import { FetchedDBQueryResult } from "~/types/utils"
import {
  type TGetUserPlaylistsParams,
  type TGetUserPlaylistsReturn,
} from "~/lib/queries/db/getUserPlaylists"
import {
  type TCreatePlaylistEntryReturn,
  type TCreatePlaylistEntryParams,
} from "~/lib/queries/db/createPlaylistEntry"

export const useAddToWatchLaterMutation = (romId: string) => {
  const { data: session } = useSession()

  const playlistsQuery = useFetch<
    FetchedDBQueryResult<TGetUserPlaylistsReturn>,
    TGetUserPlaylistsParams
  >(
    { url: "/api/playlists" },
    { staleTime: 5 * 60 * 1000, enabled: Boolean(session?.user.id) },
  )

  let playlistId =
    playlistsQuery?.data?.find(({ type }) => type === "watch_later")?.id ||
    "broken_id"

  // const addToWatchLaterMutation = useMutation({
  //   mutationFn: () => apiQueries.createPlaylistEntry({ playlistId, romId }),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries("playlists-contains-rom")
  //   },
  // })

  const addToWatchLaterMutation = useGenericMutation<
    FetchedDBQueryResult<TCreatePlaylistEntryReturn>,
    TCreatePlaylistEntryParams
  >(
    { url: "/api/playlists/entries", options: { method: "POST" } },
    {
      invalidateQueries: ["/api/playlists/contains-rom"],
    },
  )

  return addToWatchLaterMutation
}
