import { useQuery } from "react-query"
import { apiQueries } from "@/lib/queries/apiQueries"
import { UiRom } from "@/types/index"

type initialData = {
  data: UiRom[]
  total: number
}

export const useRomsQuery = ({
  skip,
  platform,
  titleStartsWith,
  initialData,
}: {
  skip?: number
  platform?: string
  titleStartsWith?: string
  initialData?: initialData
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
        where: {
          AND: [
            {
              platform: {
                in: platform && platform !== "all" ? [platform] : undefined,
              },
            },
            { name: { startsWith: titleStartsWith } },
          ],
        },
      }),
    initialData,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    retry: false,
    refetchOnMount: false,
  })

  return query
}
