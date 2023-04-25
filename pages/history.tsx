import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { getSession } from "next-auth/react"
import { ReactElement } from "react"
import { List } from "~/components/pages/history/List"
import { Layout } from "~/components/pages/layout/Layout"
import { useFetch } from "~/lib/fetcher"
import prisma from "~/lib/prismadb"
import { NextPageWithLayout } from "./_app"
import {
  type TPlaylistsEntriesParams,
  type TPlaylistsEntriesReturn,
} from "~/lib/queries/db/getPlaylistsEntries"
import { FetchedDBQueryResult } from "~/types/utils"

const History: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ id }) => {
  const { data } = useFetch<
    FetchedDBQueryResult<TPlaylistsEntriesReturn>,
    TPlaylistsEntriesParams
  >({
    url: "/api/playlists/entries",
    search: { playlistId: id },
  })

  return <div>{!!data?.data && <List entries={data.data} />}</div>
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

  // TODO: refactor with dbQueries + orderBy
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
