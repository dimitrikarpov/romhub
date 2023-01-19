import { useMutation, useQueryClient } from "react-query"
import { useSession } from "next-auth/react"
import { api } from "@/lib/api"
import { usePlaylistsQuery } from "@/components/layout/usePlaylistsQuery"

export const useAddToWatchLaterMutation = (romId: string) => {
  const { data: session } = useSession()
  const queryClient = useQueryClient()

  const playlistsQuery = usePlaylistsQuery(session?.user.id)

  let playlistId =
    playlistsQuery?.data?.find(({ type }) => type === "watch_later")?.id ||
    "broken_id"

  const addToWatchLaterMutation = useMutation({
    mutationFn: () => api.playlistEntries.create({ playlistId, romId }),
    onSuccess: () => {
      queryClient.invalidateQueries("playlists-with-rom")
    },
  })

  return addToWatchLaterMutation
}
