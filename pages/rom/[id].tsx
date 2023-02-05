import { ReactElement } from "react"
import { GetServerSideProps } from "next"
import Head from "next/head"
import { Session } from "next-auth"
import { useSession } from "next-auth/react"
import prisma from "@/lib/prismadb"
import { UiRom } from "@/types/index"
import { NextPageWithLayout } from "../_app"
import { EmulatorComponent } from "@/components/pages/rom/EmulatorComponent"
import { useRomDownloader } from "@/components/pages/rom/useRomDownloader"
import { Layout } from "@/components/pages/layout/Layout"
import { DownloadIcon } from "@/components/ui/icons"
import { Button } from "@/components/ui/button/Button"
import { convertEntity } from "@/lib/convertEntity"
import { getCoreUrlByRomName } from "@/lib/getCoreUrlByFilename"
import { SaveToPlaylistButton } from "@/components/pages/rom/SaveToPlaylistButton"
import { ShareButton } from "@/components/pages/rom/ShareButton"
import { InputsButton } from "@/components/pages/rom/InputsButton"
import styles from "../../styles/Rom.module.css"

type Props = { rom: UiRom | undefined; url: string }

const RomPage: NextPageWithLayout<Props> = ({ rom, url }) => {
  const { rom: buffer } = useRomDownloader(rom?.file)
  const coreUrl = rom?.file && getCoreUrlByRomName(rom?.file)

  const { data: session } = useSession()
  const displaySaveToDialog = canSaveRomToOwnPlaylist(session)

  return (
    <>
      <Head>
        <title>RomHub: {rom?.name}</title>
        <meta name="description" content={`RomHub: ${rom?.name}`} />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content={`RomHub: ${rom?.name}`} />
        <meta property="og:image" content={rom?.images?.[0]} />
        <meta property="og:url" content={url} />
      </Head>

      <div className={styles["page-container"]}>
        {buffer && coreUrl && rom && (
          <EmulatorComponent
            coreUrl={String(coreUrl)}
            romBuffer={buffer}
            rom={rom}
          />
        )}

        <div className={styles["name-box"]}>
          <span className={styles["platform"]}>{rom?.platform}</span>
          <span className={styles["name"]}>{rom?.name}</span>
        </div>

        <div className={styles["actions-box"]}>
          <ShareButton />

          <Button>
            <DownloadIcon />
            <span>Download</span>
          </Button>

          {displaySaveToDialog && <SaveToPlaylistButton romId={rom!.id} />}
        </div>

        <div className={styles["actions-box"]}>
          <InputsButton />
        </div>

        <div className={styles.description}>
          {rom?.description && <p>{rom.description}</p>}
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

/**
  - download
  - share
  - watch later
  - save to playlist

  - show controls
  - fullscreen
  - make savestate/ load from savestate
  - make screenshot
 */
