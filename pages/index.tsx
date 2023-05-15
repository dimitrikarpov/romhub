import React, { ReactElement, useState } from "react"
import Head from "next/head"
import { TPlatformSlug } from "../types"
import { NextPageWithLayout } from "./_app"
import { Layout } from "~/components/pages/layout/Layout"
import { Gallery } from "~/components/pages/gallery/Gallery"
import { PlatformFilter } from "~/components/pages/gallery/PlatformFilter"
import { Paginator } from "~/components/ui/paginator/Paginator"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import superjson from "superjson"
import { useFetch } from "~/lib/fetcher"
import { getRoms, type GetRoms } from "~/lib/queries/db/getRoms"
import {
  AlphabetPaginator,
  alphabet,
} from "~/components/pages/gallery/AplhabetPaginator"

const Home: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ initialData }) => {
  const [platform, setPlatform] = useState<TPlatformSlug | undefined>()
  const [skip, setSkip] = useState(0)
  const [startsWithLetter, setStartsWithLetter] = useState("a")

  const romsQuery = useFetch<GetRoms>(
    {
      url: "/api/roms",
      search: {
        skip,
        take: 15,
        where: {
          AND: [
            { platform: { in: platform ? [platform] : undefined } },
            startsWithLetter !== "#"
              ? {
                  name: { startsWith: startsWithLetter },
                }
              : {},
          ],
          ...(startsWithLetter === "#" && {
            NOT: alphabet.map((letter) => ({ name: { startsWith: letter } })),
          }),
        },
        orderBy: [{ name: "asc" }],
      },
    },
    {
      initialData: superjson.parse(initialData),
      keepPreviousData: true,
    },
  )

  const { data } = romsQuery
  const roms = data?.data
  const total = data?.total

  const selectPlatform = (slug: TPlatformSlug | undefined) => {
    setSkip(0)
    setPlatform(slug)
  }

  const selectLetter = (letter: string) => {
    setSkip(0)
    setStartsWithLetter(letter)
  }

  return (
    <>
      <Head>
        <title>RomHub</title>
        <meta name="description" content="Search and Play!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mx-auto my-0 bg-[#0f0f0f] pt-8">
        <PlatformFilter value={platform} onChange={selectPlatform} />

        <AlphabetPaginator value={startsWithLetter} onChange={selectLetter} />

        <Gallery roms={roms} />

        <div className="px-0 py-12">
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

export const getServerSideProps: GetServerSideProps<{
  initialData: string
}> = async () => {
  const initialData = await getRoms({
    take: 15,
    orderBy: [{ name: "asc" }],
    where: { AND: [{ name: { startsWith: "a" } }] },
  })

  return {
    props: {
      initialData: superjson.stringify(initialData),
    },
  }
}
