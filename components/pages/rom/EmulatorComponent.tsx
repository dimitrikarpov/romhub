import { UiRom } from "~/types/index"
import clsx from "clsx"
import { Retroarch } from "holy-retroarch"
import {
  memo,
  MutableRefObject,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { ControlsOverlay } from "./emulator-controls/ControlsOverlay"
import { EmulatorBackdrop } from "./EmulatorBackdrop"
import { useRetroarch } from "./useRetroarch"
import { useResizeObserver } from "./useSizeObserver"
import { useSaveToHistory } from "./useSaveToHistory"

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
    const [isInTheaterMod, setIsInTheaterMod] = useState(false)
    const { status, retroarch } = useRetroarch(coreUrl, canvasRef)
    const saveRomToHistory = useSaveToHistory()

    const onContainerResize = useCallback((target: HTMLDivElement) => {
      resizeCanvas(retroarch?.current, isRunningRef, canvasBoxRef)
    }, [])

    const containerRef = useResizeObserver(onContainerResize)

    useEffect(() => {
      if (status === "inited") {
        retroarch?.current?.copyConfig()
        retroarch?.current?.copyRom(romBuffer)
      }
    }, [status])

    const onStartClick = () => {
      retroarch?.current?.start()
      setShowBackdrop(false)

      isRunningRef.current = true

      saveRomToHistory(rom.id)
      resizeCanvas(retroarch?.current, isRunningRef, canvasBoxRef)
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
