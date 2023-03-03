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
import {
  BackupIcon,
  BackupRestoreIcon,
  FullscreenExitIcon,
  FullscreenIcon,
  GamepadIcon,
  PauseIcon,
  PhotoCameraIcon,
  PlayIcon,
} from "@/components/ui/icons"
import classNames from "classnames"
import { TheaterModButton } from "./TheaterModButton"

type Props = {
  coreUrl: string
  romBuffer: Uint8Array
  rom: UiRom
}

export const EmulatorComponent: React.FunctionComponent<Props> = memo(
  ({ coreUrl, romBuffer, rom }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const canvasBoxRef = useRef<HTMLDivElement>(null)
    const isRunningRef = useRef(false)
    const [showBackdrop, setShowBackdrop] = useState(true)
    const [isInTheaterMod, setIsInTheaterMod] = useState(true)
    const { status, retroarch } = useRetroarch(coreUrl, canvasRef)
    const { data: session } = useSession()

    const onContainerResize = useCallback((target: HTMLDivElement) => {
      resizeCanvas(retroarch?.current, isRunningRef, canvasBoxRef)
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
      resizeCanvas(retroarch?.current, isRunningRef, canvasBoxRef)
    }

    return (
      <>
        <div
          className={classNames(styles.container, {
            [styles["container-fixed"]]: isInTheaterMod,
          })}
          ref={containerRef}
        >
          <div className={styles["canvas-box"]} ref={canvasBoxRef}>
            <canvas ref={canvasRef} id="canvas"></canvas>

            <div className={styles["controls-overlay"]}>
              <div className={styles["controls-container"]}>
                <div>
                  <PlayIcon />
                  <PauseIcon />
                </div>
                <div>
                  <BackupIcon />
                  <BackupRestoreIcon />
                  <PhotoCameraIcon />
                  <span title="Controls">
                    <GamepadIcon />
                  </span>
                </div>
                <div>
                  <TheaterModButton
                    isInTheaterMod={isInTheaterMod}
                    toggle={setIsInTheaterMod}
                  />
                  <FullscreenIcon />
                  <FullscreenExitIcon />
                </div>
              </div>
            </div>
          </div>

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

const resizeCanvas = (
  retroarch: Retroarch | undefined,
  isRunningRef: MutableRefObject<boolean>,
  canvasBoxRef: RefObject<HTMLDivElement>,
) => {
  if (!isRunningRef?.current || !retroarch || !canvasBoxRef.current) return

  retroarch.setCanvasSize(
    canvasBoxRef.current.clientWidth,
    canvasBoxRef.current.clientWidth / (800 / 600),
  )
}
