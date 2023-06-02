import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Head from "next/head"
import React, { ReactElement, useEffect, useState } from "react"
import superjson from "superjson"
import { AlphabetPaginator } from "~/components/pages/gallery/AplhabetPaginator"
import { Gallery } from "~/components/pages/gallery/Gallery"
import { PlatformFilter } from "~/components/pages/gallery/PlatformFilter"
import { useRomsQuery } from "~/components/pages/gallery/useRomsQuery"
import { Layout } from "~/components/pages/layout/Layout"
import { Paginator } from "~/components/ui/paginator/Paginator"
import { getRoms } from "~/lib/queries/db/getRoms"
import { TPlatformSlug } from "../types"
import { NextPageWithLayout } from "./_app"
import { useRouter } from "next/router"

const Home: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ initialData }) => {
  const router = useRouter()
  const [platform, setPlatform] = useState<TPlatformSlug | undefined>(
    router.query.platform as TPlatformSlug,
  )
  const [skip, setSkip] = useState(Number(router.query.skip) || 0)
  const [startsWithLetter, setStartsWithLetter] = useState(
    (router.query.startsWithLetter as string) || "a",
  )

  console.log({
    router: {
      platform: router.query.platform,
      skip: router.query.skip,
      startsWithLetter: router.query.startsWithLetter,
    },
    state: {
      platform,
      skip,
      startsWithLetter,
    },
  })

  // TODO: if state has skip, platform, startsWith and router is empty - we should reset local state

  const setUrlParams = () => {
    const urlParams = new URLSearchParams({
      startsWithLetter,
      skip: String(skip),
      ...(platform && { platform }),
    })

    console.log("urlParams", urlParams.toString())
    router.push(`/?${urlParams.toString()}`, undefined, { shallow: true })
  }

  useEffect(() => {
    setUrlParams()
  }, [])

  useEffect(() => {
    console.log("changed!")
    setUrlParams()
  }, [
    skip,
    platform,
    startsWithLetter,
    // router.query.startsWithLetter, router.query.skip, router.query.platform
  ])

  useEffect(() => {
    return () => {
      console.log("UNMOUNT")
    }
  }, [])

  const { data: romsQueryData } = useRomsQuery({
    skip,
    platform,
    startsWithLetter,
    initialData,
  })

  const selectPlatform = (slug: TPlatformSlug | undefined) => {
    setSkip(0)
    setPlatform(slug)
  }

  const selectLetter = (letter: string) => {
    setSkip(0)
    setStartsWithLetter(letter)
  }

  const onPageChange = (newSkip: number) => {
    setSkip(newSkip)
    window.scrollTo({ top: 0, behavior: "smooth" })
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

        <Gallery roms={romsQueryData?.data} />

        <div className="mx-auto w-fit px-0 py-12">
          <Paginator
            skip={skip}
            take={15}
            total={romsQueryData?.total}
            onChange={onPageChange}
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
