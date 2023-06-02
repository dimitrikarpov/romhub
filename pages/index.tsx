import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Head from "next/head"
import React, { ReactElement } from "react"
import superjson from "superjson"
import {
  AlphabetPaginator,
  alphabet,
} from "~/components/pages/gallery/AplhabetPaginator"
import { Gallery } from "~/components/pages/gallery/Gallery"
import { PlatformFilter } from "~/components/pages/gallery/PlatformFilter"
import { useGalleryDeepLink } from "~/components/pages/gallery/useGalleryDeepLink"
import { useRomsQuery } from "~/components/pages/gallery/useRomsQuery"
import { Layout } from "~/components/pages/layout/Layout"
import { Paginator } from "~/components/ui/paginator/Paginator"
import { getRoms } from "~/lib/queries/db/getRoms"
import { TPlatformSlug } from "../types"
import { NextPageWithLayout } from "./_app"

const Home: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ initialData }) => {
  const { skip, platform, startsWithLetter, updateRoute } = useGalleryDeepLink()
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
}> = async (context) => {
  const {
    skip: RSkip,
    platform: RPlatform,
    startsWithLetter: RStartsWithLetter,
  } = context.query

  const skip = RSkip ? Number(RSkip) : 0
  const platform = RPlatform ? (String(RPlatform) as TPlatformSlug) : undefined
  const startsWithLetter = RStartsWithLetter ? String(RStartsWithLetter) : "a"

  const initialData = await getRoms({
    skip,
    take: 15,
    orderBy: [{ name: "asc" }],
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
  })

  return {
    props: {
      initialData: superjson.stringify(initialData),
    },
  }
}
