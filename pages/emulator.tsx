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

  return { props: { rom: transformRom(rom) } }
}

type Props = { rom: Rom | undefined }

export default function Emulator({ rom }: Props) {
  const { rom: buffer } = useRomDownloader(rom?.file)
  const coreUrl = rom?.file && getCoreUrlByRomName(rom?.file)

  return (
    <div className={styles.pageContainer}>
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
    </div>
  )
}
