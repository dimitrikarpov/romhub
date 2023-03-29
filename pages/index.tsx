import React, { ReactElement, useState } from "react"
import Head from "next/head"
import { TPlatformSlug, UiRom } from "../types"
import { NextPageWithLayout } from "./_app"
import { Layout } from "@/components/pages/layout/Layout"
import { Gallery } from "@/components/pages/gallery/Gallery"
import { PlatformFilter } from "@/components/pages/gallery/PlatformFilter"
import { useRomsQuery } from "@/lib/queries/react/useRomsQuery"
import { dbQueries } from "@/lib/queries/dbQueries"
import { Paginator } from "@/components/ui/paginator/Paginator"
import styles from "../styles/Home.module.css"

type Props = {
  initialData: {
    data: UiRom[]
    total: number
  }
}

const Home: NextPageWithLayout<Props> = ({ initialData }) => {
  const [platform, setPlatform] = useState<TPlatformSlug | undefined>()
  const [skip, setSkip] = useState(0)

  const romsQuery = useRomsQuery({
    skip,
    take: 15,
    platform,
    initialData,
  })

  const { data } = romsQuery
  const roms = data?.data
  const total = data?.total

  const selectPlatform = (slug: TPlatformSlug | undefined) => {
    setSkip(0)
    setPlatform(slug)
  }

  return (
    <>
      <Head>
        <title>RomHub</title>
        <meta name="description" content="Search and Play!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <PlatformFilter value={platform} onChange={selectPlatform} />

        <Gallery roms={roms} />

        <div className={styles.paginatorContainer}>
          <Paginator
            skip={skip}
            setSkip={setSkip}
            total={total}
            pageSize={15}
          />
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
  const initialData = await dbQueries.getRoms({ take: 15 })

  return {
    props: {
      initialData,
    },
  }
}
