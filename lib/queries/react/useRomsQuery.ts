import { useQuery } from "react-query"
import { apiQueries } from "@/lib/queries/apiQueries"
import { UiRom } from "@/types/index"

type initialData = {
  data: UiRom[]
  total: number
}

export const useRomsQuery = ({
  skip,
  take = 10,
  platform,
  titleContains,
  initialData,
  enabled = true,
}: {
  skip?: number
  take?: number
  platform?: string
  titleContains?: string
  initialData?: initialData
  enabled?: boolean
}) => {
  const query = useQuery({
    queryKey: [
      "roms",
      {
        skip,
        platform,
        search: titleContains,
      },
    ],
    queryFn: () =>
      apiQueries.getRoms({
        ...(skip && { skip }),
        ...(take && { take }),
        where: {
          AND: [
            {
              platform: {
                in: platform ? [platform] : undefined,
              },
            },
            { name: { contains: titleContains } },
          ],
        },
      }),
    initialData,
    enabled,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    retry: false,
    refetchOnMount: false,
  })

  return query
}
