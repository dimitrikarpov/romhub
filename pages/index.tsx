import Head from "next/head"
import React, { ReactElement } from "react"
import { AlphabetPaginator } from "~/components/pages/gallery/AplhabetPaginator"
import { Gallery } from "~/components/pages/gallery/Gallery"
import { PlatformFilter } from "~/components/pages/gallery/PlatformFilter"
import { useGalleryDeepLink } from "~/components/pages/gallery/useGalleryDeepLink"
import { useRomsQuery } from "~/components/pages/gallery/useRomsQuery"
import { Layout } from "~/components/pages/layout/Layout"
import { Paginator } from "~/components/ui/paginator/Paginator"
import { TPlatformSlug } from "../types"

const Home = () => {
  const { skip, platform, startsWithLetter, updateRoute } = useGalleryDeepLink()
  const { data: romsQueryData, isLoading } = useRomsQuery({
    skip,
    platform,
    startsWithLetter,
  })

  const selectPlatform = (slug: TPlatformSlug) => {
    updateRoute({
      skip: 0,
      platform: slug,
      startsWithLetter,
    })
  }

  const selectLetter = (letter: string) => {
    updateRoute({
      skip: 0,
      startsWithLetter: letter,
      platform,
    })
  }

  const onPageChange = (newSkip: number) => {
    updateRoute({
      skip: newSkip,
      platform,
      startsWithLetter,
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
        {isLoading ? (
          <h1>loading</h1>
        ) : (
          <>
            <PlatformFilter value={platform} onChange={selectPlatform} />

            <AlphabetPaginator
              value={startsWithLetter}
              onChange={selectLetter}
            />

            <Gallery roms={romsQueryData?.data} />

            <div className="mx-auto w-fit px-0 py-12">
              <Paginator
                skip={skip}
                take={15}
                total={romsQueryData?.total}
                onChange={onPageChange}
              />
            </div>
          </>
        )}
      </main>
    </>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Home
