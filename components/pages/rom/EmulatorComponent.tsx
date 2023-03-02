import {
  memo,
  MutableRefObject,
  RefObject,
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
import styles from "./EmulatorComponent.module.css"
import { Retroarch } from "holy-retroarch"

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

    const playlistQuery = useUserPlaylistsQuery({
      enabled: Boolean(session?.user.id),
    })

    useEffect(() => {
      if (status === "inited") {
        retroarch?.current?.copyConfig()
        retroarch?.current?.copyRom(romBuffer)
      }
    }, [status])

    // console.log({ canvasRef })

    useEffect(() => {
      console.log("MOUNTED!!!!!!!!!!!")

      window.addEventListener("resize", () => {
        console.log({ fff: isRunningRef.current })

        // cons

        return setNewDimensions(canvasRef, isRunningRef, retroarch?.current)
      })

      return () => {
        window.removeEventListener("resize", () =>
          setNewDimensions(canvasRef, isRunningRef, retroarch?.current),
        )
      }
    }, [])

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
      setNewDimensions(canvasRef, isRunningRef, retroarch?.current)
    }

    return (
      <>
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
      </>
    )
  },
)

const setNewDimensions = (
  canvasRef: RefObject<HTMLCanvasElement>,
  isRunningRef: MutableRefObject<boolean>,
  retroarch: Retroarch | undefined,
) => {
  console.log({ isRunningRef: isRunningRef.current, retroarch })

  if (!canvasRef.current) return

  const cw = document.body.scrollWidth
  const ch = window.innerHeight - 56 - 24 - 20

  const ew = canvasRef.current.clientWidth
  const eh = canvasRef.current.clientHeight

  const [width, height] = getNewEmulatorSize({
    ew: ew,
    eh: eh,
    cw: cw,
    ch: ch,
  })

  if (!isRunningRef?.current || !retroarch) return

  console.table({ ew, eh, cw, ch, W: width, H: height })
  retroarch.setCanvasSize(width, height)

  // canvasRef.current.setAttribute("width", String(width))
  // canvasRef.current.setAttribute("height", String(height))
  // canvasRef.current.setAttribute(
  //   "style",
  //   `width: ${width}px; height: ${height}px;`,
  // )
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
  const aspect = ew / eh

  const possibleHeight = Math.floor(cw / aspect)
  const possibleWidth = Math.floor(ch * aspect)

  const isPossibleWidthWillFitContainerHeight = possibleHeight < ch
  const isPossibleHeightWillFitContainerWidth = possibleWidth < cw

  if (isPossibleWidthWillFitContainerHeight) return [cw, possibleHeight]
  if (isPossibleHeightWillFitContainerWidth) return [possibleWidth, ch]

  return [ew, eh]
}
