import clsx from "clsx"
import { Retroarch, createRetroarch } from "holy-retroarch"
import { RefObject, memo, useCallback, useRef, useState } from "react"
import { getCoreUrlByRomName } from "~/lib/getCoreUrlByFilename"
import { UiRom } from "~/types/index"
import { EmulatorBackdrop } from "./EmulatorBackdrop"
import { ControlsOverlay } from "./emulator-controls/ControlsOverlay"
import { useSaveToHistory } from "./useSaveToHistory"
import { useResizeObserver } from "./useSizeObserver"

type Props = {
  rom: UiRom
}

export const EmulatorComponent: React.FunctionComponent<Props> = memo(
  ({ rom }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const canvasBoxRef = useRef<HTMLDivElement>(null)
    const retroarchInstanceRef = useRef<Retroarch>()

    const [isEmulatorLoading, setIsEmulatorLoading] = useState(false)
    const [isEmulatorReady, setIsEmulatorReady] = useState(false)

    const [showBackdrop, setShowBackdrop] = useState(true)
    const [isInTheaterMod, setIsInTheaterMod] = useState(false)
    const saveRomToHistory = useSaveToHistory()

    const onContainerResize = useCallback((target: HTMLDivElement) => {
      resizeCanvas(canvasBoxRef)
    }, [])

    const containerRef = useResizeObserver(onContainerResize)

    const onLoadClick = async () => {
      setIsEmulatorLoading(true)
      const romBuffer = await (await fetch(rom.file)).arrayBuffer()
      const romBinary = new Uint8Array(romBuffer)

      const coreUrl = getCoreUrlByRomName(rom.file) as string

      retroarchInstanceRef.current = await createRetroarch({
        coreUrl,
        canvas: canvasRef.current as HTMLCanvasElement,
        romBinary,
        onReady: () => {
          setIsEmulatorLoading(false)
          setIsEmulatorReady(true)
          console.log("brand new ON READY")
        },
        onStart: () => {
          setShowBackdrop(false)
          resizeCanvas(canvasBoxRef)
          saveRomToHistory(rom.id)
          console.log("brand new ON START")
        },
        onDestroy: () => {
          console.log("brand new ON DESTROY")
        },
      })
    }

    const onStartClick = () => {
      retroarchInstanceRef.current?.start()
    }

    const resizeCanvas = (canvasBoxRef: RefObject<HTMLDivElement>) => {
      if (
        retroarchInstanceRef.current?.status !== "started" ||
        !canvasBoxRef.current
      )
        return

      retroarchInstanceRef.current?.setCanvasSize(
        canvasBoxRef.current.clientWidth,
        canvasBoxRef.current.clientWidth / (800 / 600),
      )
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
              isEmulatorLoading={isEmulatorLoading}
              isEmulatorReady={isEmulatorReady}
              onLoadClick={onLoadClick}
              onStartClick={onStartClick}
              image={rom.images?.[0]}
            />
          )}
        </div>
      </>
    )
  },
)
