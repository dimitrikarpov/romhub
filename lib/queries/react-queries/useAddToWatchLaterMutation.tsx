import { useMutation, useQueryClient } from "react-query"
import { useSession } from "next-auth/react"
import { usePlaylistsQuery } from "@/components/pages/layout/usePlaylistsQuery"
import { apiQueries } from "../api-queries"

export const useAddToWatchLaterMutation = (romId: string) => {
  const { data: session } = useSession()
  const queryClient = useQueryClient()

  const playlistsQuery = usePlaylistsQuery(session?.user.id as string)

  let playlistId =
    playlistsQuery?.data?.find(({ type }) => type === "watch_later")?.id ||
    "broken_id"

  const addToWatchLaterMutation = useMutation({
    mutationFn: () => apiQueries.createPlaylistEntry({ playlistId, romId }),
    onSuccess: () => {
      queryClient.invalidateQueries("playlists-with-rom")
    },
  })

  return addToWatchLaterMutation
}
