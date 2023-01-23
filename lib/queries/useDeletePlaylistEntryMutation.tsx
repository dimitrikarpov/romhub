import { useMutation, useQueryClient } from "react-query"
import { api } from "../api"

export const useDeletePlaylistEntryMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: api.playlistEntries.deleteByRomId,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["playlists-with-rom"],
      })
    },
  })
}
