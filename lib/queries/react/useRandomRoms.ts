import { useQuery } from "react-query"
import { apiQueries } from "@/lib/queries/apiQueries"

type initialData = Awaited<ReturnType<typeof apiQueries.getRandomRoms>>

export const useRandomRomsQuery = ({
  enabled = true,
  initialData,
}: {
  enabled?: boolean
  initialData?: initialData
}) => {
  const query = useQuery({
    queryKey: "random",
    queryFn: () => apiQueries.getRandomRoms(),
    enabled,
    staleTime: 5 * 60 * 1000,
    initialData,
    refetchOnWindowFocus: false,
    retry: false,
    refetchOnMount: false,
  })

  return query
}
