import { memo, RefObject, useEffect, useRef, useState } from "react"
import { Retroarch } from "holy-retroarch"

type Props = {
  coreUrl: string
  rom: Uint8Array
}

let retroarch: Retroarch

export const EmulatorComponent: React.FunctionComponent<Props> = memo(
  ({ coreUrl, rom }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
      const startRA = async () => {
        retroarch = new Retroarch(
          coreUrl,
          canvasRef.current as HTMLCanvasElement,
        )
        await retroarch.init()
        retroarch.copyConfig()
        retroarch.copyRom(rom)

        setIsReady(true)
      }

      startRA()
    }, [coreUrl, rom])

    const onStartClick = async () => {
      retroarch!.start()
    }

    return (
      <>
        <canvas ref={canvasRef} id="canvas"></canvas>

        <button onClick={onStartClick} disabled={!isReady}>
          start!
        </button>
      </>
    )
  },
)
