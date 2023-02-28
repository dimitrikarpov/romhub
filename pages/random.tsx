import React, { ReactElement } from "react"
import Head from "next/head"
import { UiRom } from "../types"
import { NextPageWithLayout } from "./_app"
import { Layout } from "@/components/pages/layout/Layout"
import { dbQueries } from "@/lib/queries/dbQueries"
import { RandomGrid } from "@/components/pages/random/RandomGrid"
import { useRandomRomsQuery } from "@/lib/queries/react/useRandomRoms"
import styles from "../styles/Random.module.css"
import { useQueryClient } from "react-query"

type Props = {
  initialData: {
    roms: UiRom[]
  }
}

const Random: NextPageWithLayout<Props> = ({ initialData }) => {
  const queryClient = useQueryClient()

  const { data: roms } = useRandomRomsQuery({ initialData: initialData.roms })

  const onRoll = () => {
    queryClient.invalidateQueries({
      queryKey: "random",
    })
  }

  return (
    <>
      <Head>
        <title>RomHub</title>
        <meta name="description" content="Search and Play!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {roms && <RandomGrid roms={roms} />}

      <div className={styles["reroll"]}>
        <div className={styles["reroll-btn"]} onClick={onRoll}>
          Reroll
        </div>
      </div>
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
    props: { initialData: { roms } },
  }
}
