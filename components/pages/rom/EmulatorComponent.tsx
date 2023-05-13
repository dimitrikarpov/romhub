import { UiRom } from "~/types/index"
import clsx from "clsx"
import { type RetroarchStatus } from "holy-retroarch"
import {
  memo,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { ControlsOverlay } from "./emulator-controls/ControlsOverlay"
import { EmulatorBackdrop } from "./EmulatorBackdrop"
import { useResizeObserver } from "./useSizeObserver"
import { useSaveToHistory } from "./useSaveToHistory"
import { getRetroarch } from "~/lib/retroarch/retroarch"

type Props = {
  coreUrl: string
  romBuffer: Uint8Array
  rom: UiRom
}

export const EmulatorComponent: React.FunctionComponent<Props> = memo(
  ({ coreUrl, romBuffer, rom }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const canvasBoxRef = useRef<HTMLDivElement>(null)
    const [showBackdrop, setShowBackdrop] = useState(true)
    const [isEmulatorReady, setIsEmulatorReady] = useState(false)
    const [isInTheaterMod, setIsInTheaterMod] = useState(false)
    const saveRomToHistory = useSaveToHistory()

    useEffect(() => {
      getRetroarch().prepareCore(
        coreUrl,
        canvasRef.current as HTMLCanvasElement,
      )
    }, [])

    const onContainerResize = useCallback((target: HTMLDivElement) => {
      resizeCanvas(canvasBoxRef)
    }, [])

    const containerRef = useResizeObserver(onContainerResize)

    useEffect(() => {
      const onStatusChange = (e: Event) => {
        const detail: RetroarchStatus = (e as CustomEvent).detail

        if (detail === "inited") {
          const retroarch = getRetroarch()
          retroarch?.copyConfig()
          retroarch?.copyRom(romBuffer)
          setIsEmulatorReady(true)
        }
      }

      document.addEventListener("ra-status", onStatusChange, true)
      return document.removeEventListener("ra-status", onStatusChange)
    }, [])

    const onStartClick = () => {
      getRetroarch().start()
      setShowBackdrop(false)
      saveRomToHistory(rom.id)
      resizeCanvas(canvasBoxRef)
    }

    return (
      <>
        <div
          ref={containerRef}
          className={clsx(
            "relative flex aspect-[calc(800/600)] justify-center",
            isInTheaterMod && "max-h-[calc(100dvh-56px-24px-20px)]",
            !isInTheaterMod && "max-h-[600px]",
          )}
        >
          <div
            ref={canvasBoxRef}
            className="relative aspect-[calc(800/600)] max-h-full max-w-full"
          >
            <canvas ref={canvasRef} id="canvas"></canvas>

            <ControlsOverlay
              rom={rom}
              canvasBoxRef={canvasBoxRef}
              isInTheaterMod={isInTheaterMod}
              setIsInTheaterMod={setIsInTheaterMod}
            />
          </div>

          {showBackdrop && (
            <EmulatorBackdrop
              isEmulatorReady={isEmulatorReady}
              image={rom.images?.[0]}
              onStartClick={onStartClick}
            />
          )}
        </div>
      </>
    )
  },
)

const resizeCanvas = (canvasBoxRef: RefObject<HTMLDivElement>) => {
  const retroarch = getRetroarch()

  if (
    (retroarch.status !== "started" && retroarch.status !== "running") ||
    !canvasBoxRef.current
  )
    return

  retroarch.setCanvasSize(
    canvasBoxRef.current.clientWidth,
    canvasBoxRef.current.clientWidth / (800 / 600),
  )
}
