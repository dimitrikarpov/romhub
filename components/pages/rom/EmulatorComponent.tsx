import {
  memo,
  MutableRefObject,
  RefObject,
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
        canvasRef,
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
        canvasRef,
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
  canvasRef: RefObject<HTMLCanvasElement>,
  isRunningRef: MutableRefObject<boolean>,
  retroarch: Retroarch | undefined,
  cw: number,
  ch: number,
) => {
  if (!canvasRef.current) return

  const ew = canvasRef.current.clientWidth
  const eh = canvasRef.current.clientHeight

  const [width, height] = getNewEmulatorSize({
    ew,
    eh,
    cw,
    ch,
  })

  if (!isRunningRef?.current || !retroarch) return

  retroarch.setCanvasSize(width, height)
}

/**
 * Calculates new emulator width and height
 * depending on container's dimensions
 * to achieve max emaulator's area with saving aspect ration
 *
 * @param ew emulatorWidth
 * @param eh emulatorHeight
 * @param cw containerWidth
 * @param ch containerHeight
 * @returns [width, height]
 */
const getNewEmulatorSize = ({
  ew,
  eh,
  cw,
  ch,
}: {
  ew: number
  eh: number
  cw: number
  ch: number
}): [width: number, height: number] => {
  const aspect = 800 / 600

  const possibleHeight = Math.floor(cw / aspect)
  const possibleWidth = Math.floor(ch * aspect)

  const isPossibleWidthWillFitContainerHeight = possibleHeight < ch

  return isPossibleWidthWillFitContainerHeight
    ? [cw, possibleHeight]
    : [possibleWidth, ch]
}
