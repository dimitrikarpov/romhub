import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { getSession } from "next-auth/react"
import { ReactElement, useState } from "react"
import { List } from "~/components/pages/history/List"
import { Layout } from "~/components/pages/layout/Layout"
import { Paginator } from "~/components/ui/paginator/Paginator"
import { useFetch } from "~/lib/fetcher"
import prisma from "~/lib/prismadb"
import { type GetPlaylistsEntries } from "~/lib/queries/db/getPlaylistsEntries"
import { NextPageWithLayout } from "./_app"

const History: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ id }) => {
  const [skip, setSkip] = useState(0)

  const { data } = useFetch<GetPlaylistsEntries>({
    url: "/api/playlists/entries",
    search: {
      playlistId: id,
      skip,
      take: 15,
      orderBy: { assignedAt: "desc" },
    },
  })

  return (
    <div>
      {!!data?.data && <List entries={data.data} />}
      <div className="px-0 py-12">
        <Paginator
          skip={skip}
          setSkip={setSkip}
          total={data?.total}
          pageSize={15}
        />
      </div>
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
