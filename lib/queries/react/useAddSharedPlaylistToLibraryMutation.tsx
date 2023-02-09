import { useMutation, useQueryClient } from "react-query"
import { apiQueries } from "../apiQueries"

export const useAddSharedPlaylistToLibraryMutation = ({
  onSuccess,
}: {
  onSuccess?: () => void
}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: apiQueries.saveSharedPlaylistToLibrary,
    onSuccess: () => {
      queryClient.invalidateQueries("playlists")
      onSuccess?.()
    },
  })
}
