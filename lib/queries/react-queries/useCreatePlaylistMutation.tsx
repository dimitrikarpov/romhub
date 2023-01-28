import { useMutation, useQueryClient } from "react-query"
import { apiQueries } from "../api-queries"

export const useCreatePlaylistMutation = ({
  onSuccess,
}: {
  onSuccess?: (data?: any) => void
}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: apiQueries.createPlaylist,
    onSuccess: async (response) => {
      queryClient.invalidateQueries(["playlists"])
      const playlist = await response.json()
      onSuccess?.(playlist)
    },
  })
}
