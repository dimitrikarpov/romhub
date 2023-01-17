import Head from "next/head"
import { GetServerSideProps } from "next"
import { EmulatorComponent } from "../components/emulator/EmulatorComponent"
import { useRomDownloader } from "../components/emulator/useRomDownloader"
import { UiRom } from "../types"
import { getCoreUrlByRomName } from "../lib/getCoreUrlByFilename"
import prisma from "@/lib/prismadb"
import styles from "../styles/Emulator.module.css"
import { NextPageWithLayout } from "./_app"
import { ReactElement, useRef } from "react"
import { Layout } from "../components/layout/Layout"
import cn from "classnames"
import {
  AddToPlaylistIcon,
  DownloadIcon,
  GamepadIcon,
  ShareIcon,
  WatchLaterIcon,
} from "../components/icons"
import { InputMapping } from "../components/emulator/InputMapping"
import { SaveToPlaylist } from "@/components/save-to-playlist/SaveToPlaylist"
import { convertEntity } from "@/lib/convertEntity"

type Props = { rom: UiRom | undefined; url: string }

const Emulator: NextPageWithLayout<Props> = ({ rom, url }) => {
  const inputsDialogRef = useRef<HTMLDialogElement>(null)
  const saveToDialogRef = useRef<HTMLDialogElement>(null)
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
          <button className={cn(styles["button"], styles["button--icon"])}>
            <ShareIcon />
            <span>Share</span>
          </button>

          <button className={cn(styles["button"], styles["button--icon"])}>
            <DownloadIcon />
            <span>Download</span>
          </button>

          <button
            className={cn(styles["button"], styles["button--icon"])}
            onClick={() => openSaveModal()}
          >
            <AddToPlaylistIcon />
            <span>Save</span>
          </button>

          {/* <button className={cn(styles["button"], styles["button--icon"])}>
            <WatchLaterIcon />
            <span>Save to Watch later</span>
          </button> */}
        </div>

        <div className={styles["actions-box"]}>
          <button
            className={cn(styles["button"], styles["button--icon"])}
            onClick={() => openInputsModal()}
          >
            <GamepadIcon />
            <span>Controls</span>
          </button>
        </div>

        <div className={styles.description}>
          {rom?.description && <p>{rom.description}</p>}
        </div>

        <dialog ref={saveToDialogRef} className={styles["dialog--black"]}>
          <SaveToPlaylist romId={rom!.id} onClose={closeSaveModal} />
        </dialog>

        <dialog ref={inputsDialogRef}>
          <button data-type="close" onClick={() => closeInputsModal()}>
            close
          </button>
          <InputMapping />
        </dialog>
      </div>
    </>
  )
}

Emulator.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Emulator

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id

  const emptyProps = { props: { rom: undefined } }

  if (!id) return emptyProps

  const rom = await prisma.rom.findUnique({
    where: { id: String(context.query.id) },
  })

  if (!rom) return emptyProps

  return {
    props: {
      rom: convertEntity.rom.toUiRom(rom),
      url: `${process.env.NEXT_PUBLIC_DOMAIN}/emulator?id=${id}`,
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
