import { useMutation, useQueryClient } from "react-query"
import { apiQueries } from "../apiQueries"

export const useDeleteSharedPlaylistFromLibraryMutation = ({
  onSuccess,
}: {
  onSuccess?: () => void
}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: apiQueries.deleteSharedPlaylistFromLibrary,
    onSuccess: () => {
      queryClient.invalidateQueries("playlists")
      onSuccess?.()
    },
  })
}
