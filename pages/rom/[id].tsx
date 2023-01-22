import Head from "next/head"
import { GetServerSideProps } from "next"
import { EmulatorComponent } from "@/components/emulator/EmulatorComponent"
import { useRomDownloader } from "@/components/emulator/useRomDownloader"
import { UiRom } from "@/types/index"
import { getCoreUrlByRomName } from "@/lib/getCoreUrlByFilename"
import prisma from "@/lib/prismadb"
import styles from "../../styles/Emulator.module.css"
import { NextPageWithLayout } from "../_app"
import { ReactElement, useRef } from "react"
import { Layout } from "@/components/layout/Layout"
import {
  AddToPlaylistIcon,
  DownloadIcon,
  GamepadIcon,
  ShareIcon,
} from "@/components/icons"
import { InputMapping } from "@/components/emulator/InputMapping"
import { SaveToPlaylist } from "@/components/save-to-playlist/SaveToPlaylist"
import { convertEntity } from "@/lib/convertEntity"
import { Share } from "@/components/share/Share"
import { Button } from "@/components/button/Button"

type Props = { rom: UiRom | undefined; url: string }

const RomPage: NextPageWithLayout<Props> = ({ rom, url }) => {
  const inputsDialogRef = useRef<HTMLDialogElement>(null)
  const saveToDialogRef = useRef<HTMLDialogElement>(null)
  const shareDialogRef = useRef<HTMLDialogElement>(null)
  const { rom: buffer } = useRomDownloader(rom?.file)
  const coreUrl = rom?.file && getCoreUrlByRomName(rom?.file)

  const openInputsModal = () => {
    inputsDialogRef.current?.showModal()
  }

  const closeInputsModal = () => {
    inputsDialogRef.current?.close()
  }

  const openSaveModal = () => {
    saveToDialogRef.current?.showModal()
  }

  const closeSaveModal = () => {
    saveToDialogRef.current?.close()
  }

  const openShareModal = () => {
    shareDialogRef.current?.showModal()
  }

  const closeShareModal = () => {
    shareDialogRef.current?.close()
  }

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
          <Button onClick={openShareModal}>
            <ShareIcon />
            Share
          </Button>

          <Button>
            <DownloadIcon />
            <span>Download</span>
          </Button>

          <Button onClick={openSaveModal}>
            <AddToPlaylistIcon />
            Save
          </Button>
        </div>

        <div className={styles["actions-box"]}>
          <Button onClick={openInputsModal}>
            <GamepadIcon />
            Controls
          </Button>
        </div>

        <div className={styles.description}>
          {rom?.description && <p>{rom.description}</p>}
        </div>

        <dialog ref={saveToDialogRef}>
          <SaveToPlaylist romId={rom!.id} onClose={closeSaveModal} />
        </dialog>

        <dialog ref={inputsDialogRef}>
          <button data-type="close" onClick={() => closeInputsModal()}>
            close
          </button>
          <InputMapping />
        </dialog>

        <dialog ref={shareDialogRef}>
          <Share onClose={closeShareModal} />
        </dialog>
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
