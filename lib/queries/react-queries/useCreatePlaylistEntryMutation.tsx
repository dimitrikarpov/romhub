import { useMutation, useQueryClient } from "react-query"
import { apiQueries } from "../api-queries"

export const useCreatePlaylistEntryMutation = ({
  onSuccess,
}: {
  onSuccess?: () => void
}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: apiQueries.createPlaylistEntry,
    onSuccess: () => {
      queryClient.invalidateQueries("playlists-with-rom")
      onSuccess?.()
    },
  })
}
