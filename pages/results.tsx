import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import React, { ReactElement, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { useInfiniteQuery } from "react-query"
import { useSelector } from "react-redux"
import superjson from "superjson"
import { Layout } from "~/components/pages/layout/Layout"
import { Filters } from "~/components/pages/results/Filters"
import { Item } from "~/components/pages/results/Item"
import { NotFoundIcon } from "~/components/pages/results/NotFoundIcon"
import {
  selectPlatform,
  selectSearch,
} from "~/components/pages/results/searchSlice"
import { type GetRoms } from "~/lib/queries/db/getRoms"
import { TPlatformSlug } from "../types"
import { NextPageWithLayout } from "./_app"

const Results: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ search_query }) => {
  const { ref, inView } = useInView()
  const platform = useSelector(selectPlatform)
  const search = useSelector(selectSearch)

  const {
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetched,
  } = useInfiniteQuery<GetRoms["data"]>({
    queryKey: ["results"],
    queryFn: async ({ pageParam = "" }) =>
      queryFn(pageParam, platform, search, search_query),
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? false,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView])

  useEffect(() => {
    if (!search) return
    refetch()
  }, [search])

  return (
    <div className="mx-auto my-0 max-w-[900px] pb-12 pt-8">
      <div className="pb-12">
        <Filters refetch={refetch} />
      </div>

      <div className="flex flex-col gap-8 pb-12">
        {data &&
          data.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.data.map((entry) => (
                <Item rom={entry} key={entry.id} />
              ))}
            </React.Fragment>
          ))}
      </div>

      {isFetchingNextPage ? <div>Loading...</div> : null}

      <span style={{ visibility: "hidden" }} ref={ref}>
        intersection observer marker
      </span>

      {isFetched && data?.pages[0].data.length === 0 && (
        <div className="mx-auto my-0 flex flex-col items-center pt-[140px] text-center">
          <div className="[&_svg]:w-[424px]">
            <NotFoundIcon />
          </div>
          <div>
            <p className="mb-4 text-[2.4rem] font-normal leading-[3.2rem] text-white">
              No results found
            </p>
            <p className="text-[1.4rem] font-normal leading-8">
              Try different keywords or remove search filters
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

Results.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Results

export const getServerSideProps: GetServerSideProps<{
  search_query: string
}> = async (context) => {
  const { search_query } = context.query

  if (!search_query || typeof search_query !== "string") {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      search_query,
    },
  }
}

const queryFn = async (
  pageParam: string,
  platform: TPlatformSlug | undefined,
  search: string | undefined,
  search_query: string,
) => {
  const response = await fetch(
    `/api/roms?${new URLSearchParams({
      cursor: pageParam,
      take: "5",
      where: JSON.stringify({
        AND: [
          {
            platform: {
              in: platform ? [platform] : undefined,
            },
          },
          {
            name: { contains: search || search_query },
          },
        ],
      }),
    })}`,
  )
  const data = await response.json()
  return superjson.parse(data) as GetRoms["data"]
}
