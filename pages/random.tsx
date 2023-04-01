import React, { ReactElement } from "react"
import Head from "next/head"
import { Layout } from "@/components/pages/layout/Layout"
import { RandomGrid } from "@/components/pages/random/RandomGrid"
import { useRandomRomsQuery } from "@/lib/queries/react/useRandomRoms"
import { useQueryClient } from "react-query"
import styles from "../styles/Random.module.css"

const Random = () => {
  const queryClient = useQueryClient()

  const { data: roms } = useRandomRomsQuery({})

  const onRoll = () => {
    queryClient.invalidateQueries({
      queryKey: "random",
    })
  }

  return (
    <>
      <Head>
        <title>RomHub Randomizer</title>
        <meta name="description" content="Beat a Random!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles["pageContainer"]}>
        {roms && <RandomGrid roms={roms} />}

        <div className={styles["reroll"]}>
          <div className={styles["reroll-btn"]} onClick={onRoll}>
            Roll
          </div>
        </div>
      </div>
    </>
  )
}

Random.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Random
