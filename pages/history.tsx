import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { getSession } from "next-auth/react"
import React, { ReactElement, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { Item } from "~/components/pages/history/Item"
import { useHistoryEntriesInfiniteQuery } from "~/components/pages/history/useHistoryEntriesInfiniteQuery"
import { Layout } from "~/components/pages/layout/Layout"
import prisma from "~/lib/prismadb"
import { NextPageWithLayout } from "./_app"

const History: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ id }) => {
  const { ref, inView } = useInView()

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useHistoryEntriesInfiniteQuery(id)

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView])

  return (
    <div className="mx-auto my-0 max-w-[628px] pt-12 [&>*:not(:last-child)]:mb-8">
      <h2 className="mb-2 mt-6 text-base font-light text-[#f1f1f1]">
        Watch history
      </h2>
      {data &&
        data.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.data.map((entry) => {
              return <Item entry={entry} key={entry.id} />
            })}
          </React.Fragment>
        ))}

      {isFetchingNextPage ? <div>Loading...</div> : null}

      <span style={{ visibility: "hidden" }} ref={ref}>
        intersection observer marker
      </span>
    </div>
  )
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
