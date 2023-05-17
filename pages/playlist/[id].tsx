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
import { NextPageWithLayout } from "../_app"
import React, { useEffect, useState } from "react"
import { usePlaylistEntriesInfiniteQuery } from "~/components/pages/playlist/playlist/usePlaylistEntriesInfiniteQuery"
import { useInView } from "react-intersection-observer"

const PlaylistPage: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ initialData }) => {
  const router = useRouter()
  const { id } = router.query
  const { ref, inView } = useInView()

  const { data: playlist } = useFetch<GetPlaylistById>(
    { url: `/api/playlists/${id}` },
    { initialData: superjson.parse(initialData.playlist) },
  )

  const {
    data: entries,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = usePlaylistEntriesInfiniteQuery(id as string)

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView])

  const thumbnail =
    entries?.pages[0]?.data[0]?.rom?.images[0] || "/assets/placeholder.png"

  const total = entries?.pages[0]?.total || 0

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
          // total={entries?.total || 0}
          total={total}
        />
        <div className="basis-full">
          {entries &&
            entries.pages.map((group, i) => (
              <React.Fragment key={i}>
                {group.data.map((entry) => (
                  <Item entry={entry} key={entry.id} />
                ))}
              </React.Fragment>
            ))}

          {isFetchingNextPage ? <div>Loading...</div> : null}

          <span style={{ visibility: "hidden" }} ref={ref}>
            intersection observer marker
          </span>
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
