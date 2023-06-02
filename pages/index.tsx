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
  const [skip, setSkip] = useState(
    !!router.query.skip ? Number(router.query.skip) : 0,
  )
  const [startsWithLetter, setStartsWithLetter] = useState(
    !!router.query.startsWithLetter
      ? (router.query.startsWithLetter as string)
      : "a",
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

  const updateRoute = ({
    platform,
    skip,
    startsWithLetter,
  }: {
    platform?: TPlatformSlug
    skip?: number
    startsWithLetter?: string
  }) => {
    const urlParams = new URLSearchParams({
      ...(startsWithLetter ? { startsWithLetter } : { startsWithLetter: "a" }),
      ...(platform && { platform }),
      ...(skip ? { skip: String(skip) } : { skip: "0" }),
    })

    console.log("urlParams", urlParams.toString())
    router.push(`/?${urlParams.toString()}`, undefined, { shallow: true })
  }

  const setStateParamsFromUrl = () => {
    const { platform, skip, startsWithLetter } = router.query

    platform && setPlatform(String(platform) as TPlatformSlug)
    skip && setSkip(Number(skip))
    startsWithLetter && setStartsWithLetter(String(startsWithLetter))
  }

  useEffect(() => {
    const urlParams = new URLSearchParams({
      startsWithLetter,
      skip: String(skip),
      ...(platform && { platform: String(platform) }),
    })
    router.push(`/?${urlParams.toString()}`, undefined, { shallow: true })
  }, [])

  useEffect(() => {
    setStateParamsFromUrl()
  }, [router.query.startsWithLetter, router.query.skip, router.query.platform])

  const { data: romsQueryData } = useRomsQuery({
    skip,
    platform,
    startsWithLetter,
    initialData,
  })

  const selectPlatform = (slug: TPlatformSlug | undefined) => {
    updateRoute({
      skip: 0,
      platform: slug,
      startsWithLetter: String(router.query.startsWithLetter),
    })
  }

  const selectLetter = (letter: string) => {
    updateRoute({
      skip: 0,
      startsWithLetter: letter,
      ...(router.query.platform && {
        platform: String(router.query.platform) as TPlatformSlug,
      }),
    })
  }

  const onPageChange = (newSkip: number) => {
    updateRoute({
      skip: newSkip,
      ...(router.query.platform && {
        platform: String(router.query.platform) as TPlatformSlug,
      }),
      // этот параметр должен быть всегда походу
      ...(router.query.startsWithLetter && {
        startsWithLetter: String(router.query.startsWithLetter),
      }),
    })
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
