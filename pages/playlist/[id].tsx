import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { getSession } from "next-auth/react"
import Head from "next/head"
import { useRouter } from "next/router"
import superjson from "superjson"
import { Layout } from "~/components/pages/layout/Layout"
import { Item } from "~/components/pages/playlist/playlist/Item"
import { PlaylistSidebar } from "~/components/pages/playlist/sidebar/PlaylistSidebar"
import { useFetch } from "~/lib/fetcher"
import {
  getPlaylistById,
  type GetPlaylistById,
} from "~/lib/queries/db/getPlaylistById"
import { type GetPlaylistsEntries } from "~/lib/queries/db/getPlaylistsEntries"
import { UiPlaylistEntry } from "~/types/index"
import { NextPageWithLayout } from "../_app"
import { useState } from "react"
import { Paginator } from "~/components/ui/paginator/Paginator"

const PlaylistPage: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ initialData }) => {
  const router = useRouter()
  const { id } = router.query
  const [skip, setSkip] = useState(0)

  const { data: playlist } = useFetch<GetPlaylistById>(
    { url: `/api/playlists/${id}` },
    { initialData: superjson.parse(initialData.playlist) },
  )

  const { data: entries } = useFetch<GetPlaylistsEntries>({
    url: "/api/playlists/entries",
    search: { playlistId: id as string, skip, take: 10 },
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
          <div className="px-0 py-12">
            <Paginator
              skip={skip}
              setSkip={setSkip}
              total={entries?.total}
              pageSize={10}
            />
          </div>
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
    playlist: string
  }
}> = async (context) => {
  const session = await getSession({ req: context.req })

  const id = context.query.id as string

  const playlist = await getPlaylistById({ id })

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
        playlist: superjson.stringify(playlist),
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
