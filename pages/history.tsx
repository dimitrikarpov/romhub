import { GetServerSideProps } from "next"
import { ReactElement } from "react"
import { Layout } from "../components/pages/layout/Layout"
import { NextPageWithLayout } from "./_app"
import { getSession } from "next-auth/react"
import prisma from "@/lib/prismadb"
import styles from "../styles/History.module.css"
import { UiPlaylistEntry } from "../types/index"
import { List } from "../components/pages/history/List"
import { convertEntity } from "@/lib/convertEntity"

type Props = {
  entries: UiPlaylistEntry[]
}

const History: NextPageWithLayout<Props> = ({ entries }) => {
  return (
    <div className={styles["container"]}>
      <List entries={entries} />
    </div>
  )
}

History.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default History

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req })

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
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

  const entries = await prisma.playlistEntry.findMany({
    where: { playlistId: String(historyPlaylist?.id) },
    orderBy: { assignedAt: "desc" },
    include: { rom: true },
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
