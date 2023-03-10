import { useMutation, useQueryClient } from "react-query"
import { useSession } from "next-auth/react"
import { apiQueries } from "../apiQueries"
import { useUserPlaylistsQuery } from "./useUserPlaylistsQuery"

export const useAddToWatchLaterMutation = (romId: string) => {
  const { data: session } = useSession()
  const queryClient = useQueryClient()

  const playlistsQuery = useUserPlaylistsQuery({
    enabled: Boolean(session?.user.id),
  })

  let playlistId =
    playlistsQuery?.data?.find(({ type }) => type === "watch_later")?.id ||
    "broken_id"

  const addToWatchLaterMutation = useMutation({
    mutationFn: () => apiQueries.createPlaylistEntry({ playlistId, romId }),
    onSuccess: () => {
      queryClient.invalidateQueries("playlists-contains-rom")
    },
  })

  return addToWatchLaterMutation
}
