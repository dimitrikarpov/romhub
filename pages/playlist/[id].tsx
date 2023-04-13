import Head from "next/head"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { useRouter } from "next/router"
import { NextPageWithLayout } from "../_app"
import { getSession } from "next-auth/react"
import { PlaylistSidebar } from "@/components/pages/playlist/sidebar/PlaylistSidebar"
import { UiPlaylistEntry } from "@/types/index"
import { Item } from "@/components/pages/playlist/playlist/Item"
import { Layout } from "@/components/pages/layout/Layout"
import { dbQueries } from "@/lib/queries/dbQueries"
import { usePlaylistByIdQuery } from "@/lib/queries/react/usePlaylistByIdQuery"
import { usePlaylistEntriesQuery } from "@/lib/queries/react/usePlaylistEntriesQuery"
import { DBQueryResult } from "@/types/utils"

const PlaylistPage: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ initialData }) => {
  const router = useRouter()
  const { id } = router.query

  const { data: playlist } = usePlaylistByIdQuery({
    id: id as string,
    initialData: initialData.playlist,
  })

  const { data: entries } = usePlaylistEntriesQuery({
    id: id as string,
    initialData: initialData.entries,
  })

  const thumbnail = entries?.[0]?.rom?.images?.[0] || "/assets/placeholder.png"
  const lastEntryTimestamp = getLatestEntryTimestamp(entries!)
  const lastUpdated = lastEntryTimestamp
    ? new Date(lastEntryTimestamp)
    : undefined

  return (
    <>
      <Head>
        <title>{playlist?.title}</title>
        <meta name="description" content={playlist?.title} />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content={playlist?.title} />
        <meta property="og:image" content={thumbnail} />
      </Head>

      <div className="mx-auto my-0 flex w-[1200px] gap-4 pt-12">
        <PlaylistSidebar
          playlist={playlist!}
          thumbnail={thumbnail}
          total={entries!.length}
          lastUpdated={lastUpdated}
        />
        <div className="basis-full">
          {entries!.map((entry) => (
            <Item entry={entry} key={entry.romId} />
          ))}
        </div>
      </div>
    </>
  )
}

PlaylistPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>
}

export default PlaylistPage

export const getServerSideProps: GetServerSideProps<{
  initialData: {
    playlist: DBQueryResult<typeof dbQueries.getPlaylistById>
    entries: DBQueryResult<typeof dbQueries.getPlaylistsEntries>
  }
}> = async (context) => {
  const session = await getSession({ req: context.req })

  const id = context.query.id as string

  const playlist = await dbQueries.getPlaylistById(id)

  if (
    !playlist ||
    (!playlist.isPublic && playlist.authorId !== session?.user?.id)
  )
    return {
      notFound: true,
    }

  const entries = await dbQueries.getPlaylistsEntries(playlist.id)

  return {
    props: {
      initialData: {
        playlist,
        entries,
      },
    },
  }
}

const getLatestEntryTimestamp = (entries: UiPlaylistEntry[]): number =>
  entries.reduce((acc, entry) => {
    const entryTime = new Date(String(entry.assignedAt)).getTime()
    return entryTime > acc ? entryTime : acc
  }, 0)
