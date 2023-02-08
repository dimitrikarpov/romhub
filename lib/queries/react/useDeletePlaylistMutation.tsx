import { useMutation, useQueryClient } from "react-query"
import { apiQueries } from "../apiQueries"

export const useDeletePlaylistMutation = ({
  onSuccess,
}: {
  onSuccess?: () => void
}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: apiQueries.deletePlaylist,
    onSuccess: () => {
      queryClient.invalidateQueries(["playlists"])

      onSuccess?.()
    },
  })
}
