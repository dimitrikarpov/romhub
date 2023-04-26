import { useMutation, useQueryClient } from "react-query"
import { apiQueries } from "../apiQueries"

export const useCreatePlaylistEntryMutation = ({
  onSuccess,
}: {
  onSuccess?: () => void
}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: apiQueries.createPlaylistEntry,
    onSuccess: () => {
      queryClient.invalidateQueries(["/api/playlists/contains-rom"])
      onSuccess?.()
    },
  })
}
