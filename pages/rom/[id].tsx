import { platforms } from "config/index"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { Session } from "next-auth"
import { useSession } from "next-auth/react"
import Head from "next/head"
import { ReactElement } from "react"
import { Layout } from "~/components/pages/layout/Layout"
import { DonwloadButton } from "~/components/pages/rom/DownloadButton"
import { EmulatorComponent } from "~/components/pages/rom/EmulatorComponent"
import { SaveToPlaylistButton } from "~/components/pages/rom/SaveToPlaylistButton"
import { ShareButton } from "~/components/pages/rom/ShareButton"
import { useRomDownloader } from "~/components/pages/rom/useRomDownloader"
import { convertEntity } from "~/lib/convertEntity"
import { getCoreUrlByRomName } from "~/lib/getCoreUrlByFilename"
import prisma from "~/lib/prismadb"
import { UiRom } from "~/types/index"
import { NextPageWithLayout } from "../_app"

const RomPage: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ rom, url }) => {
  const { rom: buffer } = useRomDownloader(rom.file)
  const coreUrl = rom.file && getCoreUrlByRomName(rom.file)

  const { data: session } = useSession()
  const displaySaveToDialog = canSaveRomToOwnPlaylist(session)

  return (
    <>
      <Head>
        <title>{rom.name}</title>
        <meta name="description" content={rom.name} />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content={rom.name} />
        <meta property="og:image" content={rom.images?.[0]} />
        <meta property="og:url" content={url} />
      </Head>

      <div className="mt-6 flex w-full grow flex-col">
        {buffer && coreUrl && (
          <EmulatorComponent
            coreUrl={String(coreUrl)}
            romBuffer={buffer}
            rom={rom}
          />
        )}

        <div className="mx-auto my-0 w-[80dvw]">
          <div className="px-0 py-8 text-xl font-semibold">
            <span className="mr-8 uppercase text-[#9e9e9e]">
              {platforms[rom.platform].shortName}
            </span>
            <span className="text-white">{rom.name}</span>
          </div>

          <div className="flex justify-end gap-2">
            <ShareButton />

            <DonwloadButton name={rom.name} file={rom.file} />

            {displaySaveToDialog && <SaveToPlaylistButton romId={rom.id} />}
          </div>

          {rom.description && (
            <p>
              <div className="p-4">{rom.description}</div>
            </p>
          )}
        </div>
      </div>
    </>
  )
}

RomPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default RomPage

export const getServerSideProps: GetServerSideProps<{
  rom: UiRom
  url: string
}> = async (context) => {
  const id = context.query.id as string

  if (!id)
    return {
      notFound: true,
    }

  const rom = await prisma.rom.findUnique({
    where: { id },
  })

  if (!rom)
    return {
      notFound: true,
    }

  return {
    props: {
      rom: convertEntity.rom.toUiRom(rom),
      url: `${process.env.NEXT_PUBLIC_DOMAIN}/rom/${id}`,
    },
  }
}

// TODO: [permisson]
const canSaveRomToOwnPlaylist = (session: Session | null) => {
  return Boolean(session)
}
