import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
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
import { dbQueries } from "@/lib/queries/dbQueries"
import { usePlaylistByIdQuery } from "@/lib/queries/react/usePlaylistByIdQuery"

type Props = {
  entries: UiPlaylistEntry[]
  initialData: {
    playlist: Playlist & { author: User }
  }
}

const PlaylistPage: NextPageWithLayout<Props> = ({ initialData, entries }) => {
  const router = useRouter()
  const { id } = router.query

  const playlistQuery = usePlaylistByIdQuery({
    id: id as string,
    initialData: initialData.playlist,
  })
  const { data: playlist } = playlistQuery

  const thumbnail = entries?.[0]?.rom?.images?.[0] || "/assets/placeholder.png"

  const lastEntryTimestamp = getLatestEntryTimestamp(entries)

  const lastUpdated = lastEntryTimestamp
    ? new Date(lastEntryTimestamp)
    : undefined

  return (
    <div className={styles["container"]}>
      <PlaylistSidebar
        playlist={playlist!}
        thumbnail={thumbnail}
        total={entries.length}
        lastUpdated={lastUpdated}
      />
      <div className={styles["items-container"]}>
        {entries.map((entry) => (
          <Item entry={entry} key={entry.romId} />
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

  const playlist = await dbQueries.getPlaylistById(id)

  if (
    !playlist ||
    (!playlist.isPublic && playlist.authorId !== session?.user?.id)
  )
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }

  // TODO: looks like it better approach than in dbQuery.getPlaylistsEntries
  const entries = await prisma.playlistEntry.findMany({
    where: { playlistId: playlist.id },
    include: { rom: true },
  })

  return {
    props: {
      initialData: {
        playlist,
      },
      entries: entries.map((entry) => ({
        ...entry,
        rom: convertEntity.rom.toUiRom(entry.rom),
      })),
    },
  }
}

const getLatestEntryTimestamp = (entries: UiPlaylistEntry[]): number =>
  entries.reduce((acc, entry) => {
    const entryTime = entry.assignedAt.getTime()
    return entryTime > acc ? entryTime : acc
  }, 0)
