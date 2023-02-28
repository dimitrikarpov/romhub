import React, { ReactElement } from "react"
import Head from "next/head"
import { UiRom } from "../types"
import { NextPageWithLayout } from "./_app"
import { Layout } from "@/components/pages/layout/Layout"
import { dbQueries } from "@/lib/queries/dbQueries"
import { RandomGrid } from "@/components/pages/random/RandomGrid"

type Props = {
  roms: UiRom[]
}

const Random: NextPageWithLayout<Props> = ({ roms }) => {
  return (
    <>
      <Head>
        <title>RomHub</title>
        <meta name="description" content="Search and Play!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <RandomGrid roms={roms} />
    </>
  )
}

Random.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Random

export async function getServerSideProps() {
  const roms = await dbQueries.getRandomRoms(6)

  return {
    props: { roms },
  }
}
