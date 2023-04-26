import React, { ReactElement } from "react"
import Head from "next/head"
import { Layout } from "~/components/pages/layout/Layout"
import { RandomGrid } from "~/components/pages/random/RandomGrid"
import { useQueryClient } from "react-query"
import { type GetRandomRoms } from "~/lib/queries/db/getRandomRoms"
import { useFetch } from "~/lib/fetcher"
const Random = () => {
  const queryClient = useQueryClient()

  const { data: roms } = useFetch<GetRandomRoms>({
    url: "/api/roms/random",
  })

  const onRoll = () => {
    queryClient.invalidateQueries({
      queryKey: "/api/roms/random",
    })
  }

  return (
    <>
      <Head>
        <title>RomHub Randomizer</title>
        <meta name="description" content="Beat a Random!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mx-auto my-0">
        {roms && <RandomGrid roms={roms} />}

        <div className="flex items-center justify-center pt-12">
          <div
            onClick={onRoll}
            className="cursor-pointer rounded-md border border-solid border-white bg-[#9198e58c] px-6 py-3 text-xl"
          >
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
