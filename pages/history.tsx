import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { getSession } from "next-auth/react"
import React, { ReactElement } from "react"
import { useInfiniteQuery } from "react-query"
import superjson from "superjson"
import { Item } from "~/components/pages/history/Item"
import { Layout } from "~/components/pages/layout/Layout"
import { Button } from "~/components/ui/button/button"
import prisma from "~/lib/prismadb"
import type { GetPlaylistEntriesInfinite } from "~/lib/queries/db/getPlaylistEntriesInfinite"
import { NextPageWithLayout } from "./_app"

const History: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ id }) => {
  const {
    isLoading,
    isError,
    data,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<GetPlaylistEntriesInfinite["data"]>({
    queryKey: ["history"],
    queryFn: async ({ pageParam = "" }) => {
      const response = await fetch(
        `/api/playlists/entries/infinite?${new URLSearchParams({
          cursor: pageParam,
          playlistId: id,
        })}`,
      )
      const data = await response.json()
      return superjson.parse(data)
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? false,
  })

  return (
    <div className="mx-auto my-0 max-w-[628px] pt-12 [&>*:not(:last-child)]:mb-8">
      <h2 className="mb-2 mt-6 text-base font-light text-[#f1f1f1]">
        Watch history
      </h2>
      {data &&
        data.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.data.map((entry) => {
              return <Item entry={entry} key={entry.id} />
            })}
          </React.Fragment>
        ))}

      {hasNextPage && <Button onClick={() => fetchNextPage()}>MOAR!!</Button>}
    </div>
  )
}

History.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default History

export const getServerSideProps: GetServerSideProps<{
  id: string
}> = async (context) => {
  const session = await getSession({ req: context.req })

  if (!session) {
    return {
      notFound: true,
    }
  }

  const historyPlaylist = await prisma.playlist.findFirst({
    where: {
      AND: [
        { users: { every: { userId: session.user.id } } },
        { type: "history" },
      ],
    },
    select: { id: true },
  })

  if (!historyPlaylist) {
    return {
      notFound: true,
    }
  }

  return {
    props: { id: historyPlaylist.id },
  }
}
