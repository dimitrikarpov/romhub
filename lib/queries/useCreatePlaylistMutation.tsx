import { useMutation, useQueryClient } from "react-query"
import { api } from "../api"

export const useCreatePlaylistMutation = ({
  onSuccess,
}: {
  onSuccess?: (data?: any) => void
}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: api.playlists.create,
    onSuccess: async (response) => {
      queryClient.invalidateQueries(["playlists"])
      const playlist = await response.json()
      onSuccess?.(playlist)
    },
  })
}
