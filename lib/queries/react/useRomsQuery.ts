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
  titleStartsWith,
  initialData,
  enabled = true,
}: {
  skip?: number
  take?: number
  platform?: string
  titleStartsWith?: string
  initialData?: initialData
  enabled?: boolean
}) => {
  const query = useQuery({
    queryKey: [
      "roms",
      {
        skip,
        platform,
        search: titleStartsWith,
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
            { name: { startsWith: titleStartsWith } },
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
