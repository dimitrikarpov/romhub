import { useFetch } from "~/lib/fetcher"
import { type GetRoms } from "~/lib/queries/db/getRoms"
import { TPlatformSlug } from "~/types/index"
import { alphabet } from "./AplhabetPaginator"

export const useRomsQuery = ({
  skip,
  platform,
  startsWithLetter,
}: {
  skip: number
  platform: TPlatformSlug | undefined
  startsWithLetter: string
  enabled?: boolean
}) => {
  return useFetch<GetRoms>(
    {
      url: "/api/roms",
      search: {
        skip,
        take: 15,
        where: {
          AND: [
            { platform: { in: platform ? [platform] : undefined } },
            startsWithLetter !== "#"
              ? {
                  name: { startsWith: startsWithLetter },
                }
              : {},
          ],
          ...(startsWithLetter === "#" && {
            NOT: alphabet.map((letter) => ({ name: { startsWith: letter } })),
          }),
        },
        orderBy: [{ name: "asc" }],
      },
    },
    {
      keepPreviousData: true,
    },
  )
}
