import Head from "next/head"
import { GetServerSideProps } from "next"
import { NextPageWithLayout } from "../_app"
import { getSession } from "next-auth/react"
import { Playlist, User } from "@prisma/client"
import prisma from "@/lib/prismadb"
import styles from "../../styles/Playlist.module.css"
import { PlaylistSidebar } from "@/components/pages/playlist/sidebar/PlaylistSidebar"
import { UiPlaylistEntry } from "@/types/index"
import { convertEntity } from "@/lib/convertEntity"
import { Item } from "@/components/pages/playlist/playlist/Item"
import { Layout } from "@/components/pages/layout/Layout"

type Props = {
  playlist: Playlist & { User: User }
  entries: UiPlaylistEntry[]
}

const PlaylistPage: NextPageWithLayout<Props> = ({ playlist, entries }) => {
  const thumbnail = entries?.[0]?.rom?.images?.[0] || "/assets/placeholder.png"

  const lastEntryTimestamp = getLatestEntryTimestamp(entries)

  const lastUpdated = lastEntryTimestamp
    ? new Date(lastEntryTimestamp)
    : undefined

  return (
    <div className={styles["container"]}>
      <PlaylistSidebar
        playlist={playlist}
        thumbnail={thumbnail}
        total={entries.length}
        lastUpdated={lastUpdated}
      />
      <div className={styles["items-container"]}>
        {entries.map((entry) => (
          <Item entry={entry} key={entry.id} />
        ))}
      </div>
    </div>
  )
}

PlaylistPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

export default PlaylistPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req })

  const id = context.query.id as string

  const playlist = await prisma.playlist.findFirst({
    where: { id, userId: session?.user?.id },
    include: { User: true },
  })

  if (
    !playlist ||
    (!playlist.isPublic && playlist.userId !== session?.user?.id)
  )
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }

  const entries = await prisma.playlistEntry.findMany({
    where: { playlistId: playlist.id },
    include: { rom: true },
  })

  return {
    props: {
      playlist,
      entries: entries.map((entry) => ({
        ...entry,
        rom: convertEntity.rom.toUiRom(entry.rom),
      })),
    },
  }
}

const getLatestEntryTimestamp = (entries: UiPlaylistEntry[]): number =>
  entries.reduce((acc, entry) => {
    const entryTime = entry.createdAt.getTime()
    return entryTime > acc ? entryTime : acc
  }, 0)
