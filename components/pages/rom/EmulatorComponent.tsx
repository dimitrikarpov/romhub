import {
  memo,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { useRetroarch } from "./useRetroarch"
import { UiRom } from "../../../types"
import { EmulatorBackdrop } from "./EmulatorBackdrop"
import { useSession } from "next-auth/react"
import { useUserPlaylistsQuery } from "@/lib/queries/react/useUserPlaylistsQuery"
import { apiQueries } from "@/lib/queries/apiQueries"
import { Retroarch } from "holy-retroarch"
import { useResizeObserver } from "./useSizeObserver"
import styles from "./EmulatorComponent.module.css"
import { getNewEmulatorSize } from "./getNewEmulatorSize"

type Props = {
  coreUrl: string
  romBuffer: Uint8Array
  rom: UiRom
}

export const EmulatorComponent: React.FunctionComponent<Props> = memo(
  ({ coreUrl, romBuffer, rom }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const isRunningRef = useRef(false)
    const [showBackdrop, setShowBackdrop] = useState(true)
    const { status, retroarch } = useRetroarch(coreUrl, canvasRef)
    const { data: session } = useSession()

    const onContainerResize = useCallback((target: HTMLDivElement) => {
      setNewDimensions(
        isRunningRef,
        retroarch?.current,
        target.clientWidth,
        target.clientHeight,
      )
    }, [])

    const containerRef = useResizeObserver(onContainerResize)

    const playlistQuery = useUserPlaylistsQuery({
      enabled: Boolean(session?.user.id),
    })

    useEffect(() => {
      if (status === "inited") {
        retroarch?.current?.copyConfig()
        retroarch?.current?.copyRom(romBuffer)
      }
    }, [status])

    const saveRomToHistory = async () => {
      if (!session?.user?.id || !playlistQuery.data) return

      const historyPlaylist = playlistQuery.data.find(
        ({ type }) => type === "history",
      )

      // TODO: replace with mutation
      await apiQueries.createPlaylistEntry({
        playlistId: historyPlaylist!.id,
        romId: rom.id,
      })
    }

    const onStartClick = () => {
      retroarch?.current?.start()
      setShowBackdrop(false)

      isRunningRef.current = true

      saveRomToHistory()
      setNewDimensions(
        isRunningRef,
        retroarch?.current,
        containerRef.current!.clientWidth,
        containerRef.current!.clientHeight,
      )
    }

    return (
      <>
        <div className={styles.container} ref={containerRef}>
          <canvas ref={canvasRef} id="canvas"></canvas>

          {showBackdrop && (
            <EmulatorBackdrop
              status={status}
              image={rom.images?.[0]}
              onStartClick={onStartClick}
            />
          )}
        </div>
      </>
    )
  },
)

const setNewDimensions = (
  isRunningRef: MutableRefObject<boolean>,
  retroarch: Retroarch | undefined,
  cw: number,
  ch: number,
) => {
  if (!isRunningRef?.current || !retroarch) return

  const [width, height] = getNewEmulatorSize({ cw, ch })
  retroarch.setCanvasSize(width, height)
}
