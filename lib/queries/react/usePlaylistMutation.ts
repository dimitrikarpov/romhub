import { useMutation, useQueryClient } from "react-query"
import { apiQueries } from "../apiQueries"

export const usePlaylistMutation = ({
  onSuccess,
}: {
  onSuccess?: (data?: any) => void
}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: apiQueries.patchPlaylist,
    onSuccess: async (data, variables) => {
      queryClient.setQueryData(["playlist", { id: variables.id }], data)

      onSuccess?.(data)
    },
  })
}
