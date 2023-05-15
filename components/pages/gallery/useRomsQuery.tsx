import superjson from "superjson"
import { useFetch } from "~/lib/fetcher"
import { type GetRoms } from "~/lib/queries/db/getRoms"
import { TPlatformSlug } from "~/types/index"
import { alphabet } from "./AplhabetPaginator"

export const useRomsQuery = ({
  skip,
  platform,
  startsWithLetter,
  initialData,
}: {
  skip: number
  platform: TPlatformSlug | undefined
  startsWithLetter: string
  initialData: string
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
      initialData: superjson.parse(initialData),
      keepPreviousData: true,
    },
  )
}
