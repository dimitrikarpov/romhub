import { useMutation, useQueryClient } from "react-query"
import { api } from "../api"

export const useCreatePlaylistEntryMutation = ({
  onSuccess,
}: {
  onSuccess?: () => void
}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: api.playlistEntries.create,
    onSuccess: () => {
      queryClient.invalidateQueries("playlists-with-rom")
      onSuccess?.()
    },
  })
}
