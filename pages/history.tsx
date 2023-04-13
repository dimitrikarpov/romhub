import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { ReactElement } from "react"
import { getSession } from "next-auth/react"
import { Layout } from "@/components/pages/layout/Layout"
import { NextPageWithLayout } from "./_app"
import prisma from "@/lib/prismadb"
import { UiRom } from "@/types/index"
import { List } from "@/components/pages/history/List"
import { convertEntity } from "@/lib/convertEntity"
import { PlaylistEntry } from "@prisma/client"

const History: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ entries }) => {
  return (
    <div>
      <List entries={entries} />
    </div>
  )
}

History.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default History

export const getServerSideProps: GetServerSideProps<{
  entries: (PlaylistEntry & {
    rom: UiRom
  })[]
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

  const entries = await prisma.playlistEntry.findMany({
    where: { playlistId: historyPlaylist.id },
    orderBy: { assignedAt: "desc" },
    include: { rom: true },
    take: 15,
  })

  const entriesWithUpdatedRoms = entries.map((entry) => ({
    ...entry,
    rom: convertEntity.rom.toUiRom(entry.rom),
  }))

  return {
    props: {
      entries: entriesWithUpdatedRoms,
    },
  }
}
