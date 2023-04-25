import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { getSession } from "next-auth/react"
import Head from "next/head"
import { useRouter } from "next/router"
import { Layout } from "~/components/pages/layout/Layout"
import { Item } from "~/components/pages/playlist/playlist/Item"
import { PlaylistSidebar } from "~/components/pages/playlist/sidebar/PlaylistSidebar"
import { useFetch } from "~/lib/fetcher"
import {
  type TPlaylistsEntriesParams,
  type TPlaylistsEntriesReturn,
} from "~/lib/queries/db/getPlaylistsEntries"
import { dbQueries } from "~/lib/queries/dbQueries"
import { usePlaylistByIdQuery } from "~/lib/queries/react/usePlaylistByIdQuery"
import { UiPlaylistEntry } from "~/types/index"
import { DBQueryResult, FetchedDBQueryResult } from "~/types/utils"
import { NextPageWithLayout } from "../_app"

const PlaylistPage: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ initialData }) => {
  const router = useRouter()
  const { id } = router.query

  const { data: playlist } = usePlaylistByIdQuery({
    id: id as string,
    initialData: initialData.playlist,
  })

  const { data: entries } = useFetch<
    FetchedDBQueryResult<TPlaylistsEntriesReturn>,
    TPlaylistsEntriesParams
  >({
    url: "/api/playlists/entries",
    search: { playlistId: id as string },
  })

  const thumbnail =
    entries?.data?.[0]?.rom?.images?.[0] || "/assets/placeholder.png"
  const lastEntryTimestamp = getLatestEntryTimestamp(entries?.data) // TODO: [perf] use memo

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
          total={entries?.total || 0}
          lastUpdated={lastEntryTimestamp}
        />
        <div className="basis-full">
          {entries?.data?.map((entry) => (
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

  return {
    props: {
      initialData: {
        playlist,
      },
    },
  }
}

const getLatestEntryTimestamp = (entries: UiPlaylistEntry[] = []) => {
  const latestEntryTimestamp = entries.reduce((acc, entry) => {
    const entryTime = new Date(String(entry.assignedAt)).getTime()
    return entryTime > acc ? entryTime : acc
  }, 0)

  return latestEntryTimestamp ? new Date(latestEntryTimestamp) : undefined
}
