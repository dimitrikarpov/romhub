import React, { ReactElement } from "react"
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
    <div>
      <RandomGrid roms={roms} />
    </div>
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
