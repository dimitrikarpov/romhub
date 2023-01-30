import React, { ReactElement, useContext } from "react"
import Head from "next/head"
import { useQuery } from "react-query"
import prisma from "@/lib/prismadb"
import { UiRom } from "../types"
import { SearchContext } from "../contexts/search/SearchContext"
import { NextPageWithLayout } from "./_app"
import { Layout } from "@/components/pages/layout/Layout"
import { Gallery } from "@/components/pages/gallery/Gallery"
import { PlatformFilter } from "@/components/pages/gallery/PlatformFilter"
import { Paginator } from "@/components/pages/gallery/Paginator"
import styles from "../styles/Home.module.css"
import { convertEntity } from "@/lib/convertEntity"
import { getRoms } from "@/lib/queries/api/getRoms"

type Props = {
  initialData: {
    data: UiRom[]
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
    queryFn: () =>
      getRoms({
        skip,
        take: 15,
        where: {
          AND: [
            {
              platform: {
                in: platform !== "all" ? [platform] : undefined,
              },
            },
            { name: { startsWith: titleStartsWith } },
          ],
        },
      }),
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
        data: roms.map(convertEntity.rom.toUiRom),
        total: initialTotal,
      },
    },
  }
}
