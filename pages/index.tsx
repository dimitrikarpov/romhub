import React, { ReactElement, useContext } from "react"
import Head from "next/head"
import { UiRom } from "../types"
import { SearchContext } from "../contexts/search/SearchContext"
import { NextPageWithLayout } from "./_app"
import { Layout } from "@/components/pages/layout/Layout"
import { Gallery } from "@/components/pages/gallery/Gallery"
import { PlatformFilter } from "@/components/pages/gallery/PlatformFilter"
import { Paginator } from "@/components/pages/gallery/Paginator"
import { useRomsQuery } from "@/lib/queries/react/useRomsQuery"
import { dbQueries } from "@/lib/queries/dbQueries"
import styles from "../styles/Home.module.css"

type Props = {
  initialData: {
    data: UiRom[]
    total: number
  }
}

const Home: NextPageWithLayout<Props> = ({ initialData }) => {
  const { skip, platform, titleStartsWith } = useContext(SearchContext)

  const romsQuery = useRomsQuery({
    skip,
    platform,
    titleStartsWith,
    initialData,
  })

  const { data } = romsQuery
  const roms = data?.data
  const total = data?.total

  return (
    <>
      <Head>
        <title>RomHub</title>
        <meta name="description" content="Search and Play!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <PlatformFilter />

        <Gallery roms={roms} />

        <div className={styles.paginatorContainer}>
          <Paginator skip={skip} total={total} />
        </div>
      </main>
    </>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Home

export async function getServerSideProps() {
  const initialData = await dbQueries.getRoms({})

  return {
    props: {
      initialData,
    },
  }
}
