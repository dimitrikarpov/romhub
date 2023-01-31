import { useMutation, useQueryClient } from "react-query"
import { apiQueries } from "../apiQueries"

export const usePlaylistMutation = ({
  onSuccess,
}: {
  onSuccess?: (data?: any) => void
}) => {
  return useMutation({
    mutationFn: apiQueries.patchPlaylist,
    onSuccess: async (response) => {
      console.log("nice!!!")
    },
  })
}
