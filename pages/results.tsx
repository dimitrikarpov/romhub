import { ReactElement } from "react"
import { NextPageWithLayout } from "./_app"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { Layout } from "@/components/pages/layout/Layout"
import { dbQueries } from "@/lib/queries/dbQueries"
import { Filters } from "@/components/pages/results/Filters"
import { UiRom } from "@/types/index"
import { useDispatch, useSelector } from "react-redux"
import {
  selectSearch,
  selectPlatform,
  selectSkip,
  setSkip,
} from "@/components/pages/results/searchSlice"
import { Paginator } from "@/components/pages/results/Paginator"
import { useRomsQuery } from "@/lib/queries/react/useRomsQuery"
import { Item } from "@/components/pages/results/Item"
import styles from "../styles/Results.module.css"

const Results: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ initialData, search_query }) => {
  const dispatch = useDispatch()
  const skip = useSelector(selectSkip)
  const platform = useSelector(selectPlatform)
  const search = useSelector(selectSearch)

  const romsQuery = useRomsQuery({
    skip,
    take: 5,
    platform,
    initialData,
    titleStartsWith: search || search_query,
  })

  const doSkip = (skip: number) => {
    dispatch(setSkip(skip))
  }

  const { data } = romsQuery
  const roms = data?.data
  const total = data?.total

  return (
    <div className={styles["container"]}>
      <div className={styles["filters-box"]}>
        <Filters />
      </div>

      <div className={styles["list"]}>
        {roms?.map((rom) => (
          <Item rom={rom} key={rom.id} />
        ))}
      </div>

      <Paginator skip={skip} setSkip={doSkip} total={total} pageSize={5} />
    </div>
  )
}

Results.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Results

export const getServerSideProps: GetServerSideProps<{
  initialData: {
    total: number
    data: UiRom[]
  }
  search_query: string
}> = async (context) => {
  const { search_query } = context.query

  if (!search_query || typeof search_query !== "string") {
    return {
      notFound: true,
    }
  }

  const initialData = await dbQueries.getRoms({
    where: { name: { startsWith: search_query } },
    take: 5,
  })

  return {
    props: {
      initialData,
      search_query,
    },
  }
}