import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { ReactElement } from "react"
import { getSession } from "next-auth/react"
import { Layout } from "@/components/pages/layout/Layout"
import { NextPageWithLayout } from "./_app"
import prisma from "@/lib/prismadb"
import { List } from "@/components/pages/history/List"
import { usePlaylistEntriesQuery } from "@/lib/queries/react/usePlaylistEntriesQuery"

const History: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ id }) => {
  const { data } = usePlaylistEntriesQuery({
    id: id as string,
  })

  return <div>{data && <List entries={data.data} />}</div>
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
