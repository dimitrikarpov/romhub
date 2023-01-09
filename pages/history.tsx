import { GetServerSideProps } from "next"
import { ReactElement } from "react"
import { Layout } from "../components/layout/Layout"
import { NextPageWithLayout } from "./_app"
import { getSession } from "next-auth/react"
import { prisma } from "../prisma/db"
import styles from "../styles/History.module.css"
import { transformRom } from "./api/roms"
import { UiPlaylistEntry } from "../types/index"
import { List } from "../components/history/List"

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

  const historyPlaylist = await prisma.playlist.findFirst({
    where: { AND: [{ userId: String(session.user.id) }, { type: "history" }] },
    select: { id: true },
  })

  const entries = await prisma.playlistEntry.findMany({
    where: { playlistId: String(historyPlaylist?.id) },
    orderBy: { createdAt: "desc" },
    include: { rom: true },
  })

  const entriesWithUpdatedRoms = entries.map((entry) => ({
    ...entry,
    rom: transformRom(entry.rom),
  }))

  return {
    props: {
      entries: entriesWithUpdatedRoms,
    },
  }
}
