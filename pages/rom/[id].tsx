import { ReactElement } from 'react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import prisma from '@/lib/prismadb'
import { UiRom } from '@/types/index'
import { NextPageWithLayout } from '../_app'
import { EmulatorComponent } from '@/components/pages/rom/EmulatorComponent'
import { useRomDownloader } from '@/components/pages/rom/useRomDownloader'
import { Layout } from '@/components/pages/layout/Layout'
import { convertEntity } from '@/lib/convertEntity'
import { getCoreUrlByRomName } from '@/lib/getCoreUrlByFilename'
import { SaveToPlaylistButton } from '@/components/pages/rom/SaveToPlaylistButton'
import { ShareButton } from '@/components/pages/rom/ShareButton'
import { DonwloadButton } from '@/components/pages/rom/DownloadButton'
import { platforms } from 'config/index'

type Props = { rom: UiRom | undefined; url: string }

const RomPage: NextPageWithLayout<Props> = ({ rom, url }) => {
  const { rom: buffer } = useRomDownloader(rom?.file)
  const coreUrl = rom?.file && getCoreUrlByRomName(rom?.file)

  const { data: session } = useSession()
  const displaySaveToDialog = canSaveRomToOwnPlaylist(session)

  return (
    <>
      <Head>
        <title>{rom?.name}</title>
        <meta name="description" content={rom?.name} />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content={rom?.name} />
        <meta property="og:image" content={rom?.images?.[0]} />
        <meta property="og:url" content={url} />
      </Head>

      <div className="mt-6 flex w-full grow flex-col">
        {buffer && coreUrl && rom && (
          <EmulatorComponent
            coreUrl={String(coreUrl)}
            romBuffer={buffer}
            rom={rom}
          />
        )}

        <div className="mx-auto my-0 w-[80dvw]">
          <div className="px-0 py-8 text-[2rem] font-semibold leading-[2.8rem]">
            <span className="mr-8 uppercase text-[#9e9e9e]">
              {rom && rom.platform && platforms[rom.platform].shortName}
            </span>
            <span className="text-white">{rom?.name}</span>
          </div>

          <div className="flex justify-end gap-4">
            <ShareButton />

            <DonwloadButton name={rom?.name} file={rom?.file} />

            {displaySaveToDialog && rom && (
              <SaveToPlaylistButton romId={rom.id} />
            )}
          </div>

          <div className="p-4">
            {rom && rom?.description && <p>{rom.description}</p>}
          </div>
        </div>
      </div>
    </>
  )
}

RomPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default RomPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id as string

  const emptyProps = { props: { rom: undefined } }

  if (!id) return emptyProps

  const rom = await prisma.rom.findUnique({
    where: { id },
  })

  if (!rom) return emptyProps

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
