import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { getSession } from "next-auth/react"
import React, { ReactElement, useState } from "react"
import { List } from "~/components/pages/history/List"
import { Layout } from "~/components/pages/layout/Layout"
import { Paginator } from "~/components/ui/paginator/Paginator"
import { useFetch } from "~/lib/fetcher"
import prisma from "~/lib/prismadb"
import { type GetPlaylistsEntries } from "~/lib/queries/db/getPlaylistsEntries"
import { NextPageWithLayout } from "./_app"
import { useInfiniteQuery } from "react-query"
import { Playlist } from "@prisma/client"
import { UiRom } from "../types"
import { Item } from "~/components/pages/history/Item"
import { Button } from "~/components/ui/button/button"

type HistoryData = {
  rom: UiRom
  id: string
  romId: string
  playlistId: string
  assignedAt: Date
  playlist: Playlist
}

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
  } = useInfiniteQuery({
    queryKey: ["history"],
    queryFn: async ({ pageParam = "" }) => {
      const response = await fetch(
        [
          "/api/playlists/entries/infinite",
          new URLSearchParams({ cursor: pageParam, playlistId: id }),
        ].join("?"),
      )
      const data = await response.json()

      return data
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? false,
  })

  console.log({ data })
  return (
    <div className="mx-auto my-0 max-w-[628px] pt-12 [&>*:not(:last-child)]:mb-8">
      <h2 className="mb-2 mt-6 text-base font-light text-[#f1f1f1]">
        Watch history
      </h2>
      {data &&
        data.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.data.map((entry: HistoryData) => {
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
