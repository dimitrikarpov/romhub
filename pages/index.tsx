import React, { ReactElement, useContext } from "react"
import Head from "next/head"
import { Rom } from "../types"
import { prisma } from "../prisma/db"
import { transformRom } from "./api/roms"
import styles from "../styles/Home.module.css"
import { useRomsFetcher } from "../components/useRomsFetcher"
import { RomGridControls } from "../components/rom-grid/RomGridControls"
import { Gallery } from "../components/gallery/Gallery"
import { NextPageWithLayout } from "./_app"
import { Layout } from "../components/layout/Layout"
import { PlatformFilter } from "../components/gallery/PlatformFilter"
import { Paginator } from "../components/gallery/Paginator"
import { useQuery } from "react-query"
import { api } from "../lib/api"
import { SearchContext } from "../contexts/search/SearchContext"

type Props = {
  initialRoms: Rom[]
  initialTotal: number
}

const Home: NextPageWithLayout<Props> = ({ initialRoms, initialTotal }) => {
  // const {
  //   roms,
  //   canFetchNext,
  //   canFetchPrev,
  //   nextPage,
  //   prevPage,
  //   currentPage,
  //   totalPages,
  //   setPage,
  //   platform,
  //   setPlatform,
  //   setTitleStartsWith,
  // } = useRomsFetcher(initialRoms, initialTotal)

  const { platform, titleStartsWith } = useContext(SearchContext)

  const romsQuery = useQuery(
    ["roms", platform, titleStartsWith],
    () => api.roms.findMany({ platform, titleStartsWith }),
    { refetchOnWindowFocus: false, retry: false },
  )

  return (
    <>
      <Head>
        <title>RomHub</title>
        <meta name="description" content="Search and Play!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <PlatformFilter />

        {/* <RomGridControls
          platform={platform}
          setPlatform={setPlatform}
          setTitleStartsWith={setTitleStartsWith}
        /> */}

        {/* <Paginator
          canFetchNext={canFetchNext}
          canFetchPrev={canFetchPrev}
          currentPage={currentPage}
          totalPages={totalPages}
          nextPage={nextPage}
          prevPage={prevPage}
          setPage={setPage}
        /> */}

        <Gallery roms={initialRoms} />
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
      initialRoms: roms.map(transformRom),
      initialTotal,
    },
  }
}
