import { ReactElement } from "react"
import { NextPageWithLayout } from "./_app"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { Layout } from "~/components/pages/layout/Layout"
import { Filters } from "~/components/pages/results/Filters"
import { useDispatch, useSelector } from "react-redux"
import {
  selectSearch,
  selectPlatform,
  selectSkip,
  setSkip,
} from "~/components/pages/results/searchSlice"
import { Paginator } from "~/components/ui/paginator/Paginator"
import { Item } from "~/components/pages/results/Item"
import { NotFoundIcon } from "~/components/ui/icons"
import { FetchedDBQueryResult } from "~/types/utils"
import { useFetch } from "~/lib/fetcher"
import {
  getRoms,
  type TGetRomsParams,
  type TGetRomsReturn,
} from "~/lib/queries/db/getRoms"
import superjson from "superjson"

const Results: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ initialData, search_query }) => {
  const dispatch = useDispatch()
  const skip = useSelector(selectSkip)
  const platform = useSelector(selectPlatform)
  const search = useSelector(selectSearch)

  const romsQuery = useFetch<
    FetchedDBQueryResult<TGetRomsReturn>,
    TGetRomsParams
  >(
    {
      url: "/api/roms",
      search: {
        skip,
        take: 5,
        where: {
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
        },
      },
    },
    {
      initialData: superjson.parse(initialData),
    },
  )

  const doSkip = (skip: number) => {
    dispatch(setSkip(skip))
  }

  const { data } = romsQuery
  const roms = data?.data
  const total = data?.total

  return (
    <div className="mx-auto my-0 max-w-[900px] pb-12 pt-8">
      <div className="pb-12">
        <Filters />
      </div>

      <div className="flex flex-col gap-8 pb-12">
        {roms?.map((rom) => (
          <Item rom={rom} key={rom.id} />
        ))}
      </div>

      {total === 0 && (
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

      <Paginator skip={skip} setSkip={doSkip} total={total} pageSize={5} />
    </div>
  )
}

Results.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Results

export const getServerSideProps: GetServerSideProps<{
  initialData: string
  search_query: string
}> = async (context) => {
  const { search_query } = context.query

  if (!search_query || typeof search_query !== "string") {
    return {
      notFound: true,
    }
  }

  const initialData = await getRoms({
    where: { name: { contains: search_query } },
    take: 5,
  })

  return {
    props: {
      initialData: superjson.stringify(initialData),
      search_query,
    },
  }
}
