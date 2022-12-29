import React, { ReactElement, useContext } from "react"
import Head from "next/head"
import { Rom } from "../types"
import { prisma } from "../prisma/db"
import { transformRom } from "./api/roms"
import styles from "../styles/Home.module.css"
import { Gallery } from "../components/gallery/Gallery"
import { NextPageWithLayout } from "./_app"
import { Layout } from "../components/layout/Layout"
import { PlatformFilter } from "../components/gallery/PlatformFilter"
import { Paginator } from "../components/gallery/Paginator"
import { useQuery } from "react-query"
import { api } from "../lib/api"
import { SearchContext } from "../contexts/search/SearchContext"

type Props = {
  initialData: {
    data: Rom[]
    total: number
  }
}

const Home: NextPageWithLayout<Props> = ({ initialData }) => {
  const { skip, platform, titleStartsWith } = useContext(SearchContext)

  const romsQuery = useQuery({
    queryKey: [
      "roms",
      {
        skip,
        platform,
        search: titleStartsWith,
      },
    ],
    queryFn: () => api.roms.findMany({ skip, platform, titleStartsWith }),
    initialData,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    retry: false,
    refetchOnMount: false,
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
  const initialTotal = await prisma.rom.count()
  const roms = await prisma.rom.findMany({ take: 15 })

  return {
    props: {
      initialData: {
        data: roms.map(transformRom),
        total: initialTotal,
      },
    },
  }
}
