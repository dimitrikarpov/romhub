import Head from "next/head"
import { GetServerSideProps } from "next"
import { EmulatorComponent } from "../components/emulator/EmulatorComponent"
import { useRomDownloader } from "../components/emulator/useRomDownloader"
import { Rom } from "../types"
import { transformRom } from "./api/roms"
import { getCoreUrlByRomName } from "../lib/getCoreUrlByFilename"
import { prisma } from "../prisma/db"
import styles from "../styles/Emulator.module.css"
import { EmulatorPageTopBar } from "../components/emulator/EmulatorPageTopBar"

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
      rom: transformRom(rom),
      url: `${process.env.NEXT_PUBLIC_DOMAIN}/emulator?id=${id}`,
    },
  }
}

type Props = { rom: Rom | undefined; url: string }

export default function Emulator({ rom, url }: Props) {
  const { rom: buffer } = useRomDownloader(rom?.file)
  const coreUrl = rom?.file && getCoreUrlByRomName(rom?.file)

  return (
    <div className={styles.pageContainer}>
      <Head>
        <title>RomHub: {rom?.title}</title>
        <meta name="description" content={`RomHub: ${rom?.title}`} />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content={`RomHub: ${rom?.title}`} />
        <meta property="og:image" content={rom?.images?.[0]} />
        <meta property="og:url" content={url} />
      </Head>

      <EmulatorPageTopBar rom={rom} />

      {buffer && coreUrl && rom && (
        <EmulatorComponent
          coreUrl={String(coreUrl)}
          romBuffer={buffer}
          rom={rom}
        />
      )}

      <div className={styles.tagBox}>
        {rom?.tags?.map((tag, index) => (
          <span className={styles.tag} key={index}>
            {tag}
          </span>
        ))}
      </div>

      <div className={styles.pageRomMeta}>
        {rom?.description && <p>{rom.description}</p>}
      </div>

      <div>
        <h4>controls</h4>
        <div className={styles.controlsGrid}>
          {Object.entries(keyConfig).map(([gamepadKey, keyboardKey]) => (
            <>
              <div className={styles.controlsGamepadKeyWrapper}>
                {gamepadKey}
              </div>
              <div>{keyboardKey}</div>
            </>
          ))}
        </div>
      </div>
    </div>
  )
}

const keyConfig = {
  "⬆️": "up",
  "⬇️": "down",
  "⬅️": "left",
  "➡️": "right",
  start: "enter",
  select: "space",
  A: "x",
  B: "z",
  X: "s",
  Y: "a",
  L: "q",
  R: "w",
}
