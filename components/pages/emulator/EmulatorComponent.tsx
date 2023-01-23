import { memo, useEffect, useRef, useState } from "react"
import { useRetroarch } from "./useRetroarch"
import styles from "../../../styles/Emulator.module.css"
import { UiRom } from "../../../types"
import { EmulatorBackdrop } from "./EmulatorBackdrop"
import { useSession } from "next-auth/react"
import { api } from "@/lib/api"
import { usePlaylistsQuery } from "../layout/usePlaylistsQuery"

type Props = {
  coreUrl: string
  romBuffer: Uint8Array
  rom: UiRom
}

export const EmulatorComponent: React.FunctionComponent<Props> = memo(
  ({ coreUrl, romBuffer, rom }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [showBackdrop, setShowBackdrop] = useState(true)
    const { status, retroarch } = useRetroarch(coreUrl, canvasRef)
    const { data: session } = useSession()

    const playlistQuery = usePlaylistsQuery(session?.user.id)

    useEffect(() => {
      if (status === "inited") {
        retroarch?.copyConfig()
        retroarch?.copyRom(romBuffer)
      }
    }, [status])

    const saveRomToHistory = async () => {
      if (!session?.user?.id || !playlistQuery.data) return

      const historyPlaylist = playlistQuery.data.find(
        ({ type }) => type === "history",
      )

      // TODO: replace with mutation
      await api.playlistEntries.create({
        playlistId: historyPlaylist!.id,
        romId: rom.id,
      })
    }

    const onStartClick = () => {
      retroarch?.start()
      setShowBackdrop(false)
      saveRomToHistory()
    }

    return (
      <div className={styles.container}>
        <canvas ref={canvasRef} id="canvas"></canvas>

        {showBackdrop && (
          <EmulatorBackdrop
            status={status}
            image={rom.images?.[0]}
            onStartClick={onStartClick}
          />
        )}
      </div>
    )
  },
)
