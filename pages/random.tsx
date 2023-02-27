import React, { ReactElement, useContext } from "react"
import { UiRom } from "../types"
import { NextPageWithLayout } from "./_app"
import { Layout } from "@/components/pages/layout/Layout"
import { dbQueries } from "@/lib/queries/dbQueries"

type Props = {
  roms: UiRom[]
}

const Random: NextPageWithLayout<Props> = ({ roms }) => {
  return <p>{JSON.stringify(roms, null, 2)}</p>
}

Random.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Random

export async function getServerSideProps() {
  const roms = await dbQueries.getRandomRoms(9)

  return {
    props: { roms },
  }
}
