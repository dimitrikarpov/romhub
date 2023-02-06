import { useMutation, useQueryClient } from "react-query"
import { apiQueries } from "../apiQueries"

export const useDeletePlaylistEntryMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: apiQueries.deletePlaylistEntryByRom,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["playlists-contains-rom"],
      })
    },
  })
}
