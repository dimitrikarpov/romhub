import { useMutation, useQueryClient } from "react-query"
import { apiQueries } from "../data-queries/api-queries"

export const useDeletePlaylistEntryMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: apiQueries.deletePlaylistEntryByRom,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["playlists-with-rom"],
      })
    },
  })
}
