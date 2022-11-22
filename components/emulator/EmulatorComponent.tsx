import { memo, useEffect, useRef } from "react"
import { StartButton } from "./StartButton"
import { useRetroarch } from "./useRetroarch"

type Props = {
  coreUrl: string
  rom: Uint8Array
}

export const EmulatorComponent: React.FunctionComponent<Props> = memo(
  ({ coreUrl, rom }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const { status, retroarch } = useRetroarch(coreUrl, canvasRef)

    useEffect(() => {
      if (status === "inited") {
        retroarch?.copyConfig()
        retroarch?.copyRom(rom)
      }
    }, [status])

    const onStartClick = () => {
      retroarch?.start()
    }

    return (
      <>
        <canvas ref={canvasRef} id="canvas"></canvas>

        <StartButton isReady={status == "inited"} onClick={onStartClick} />
      </>
    )
  },
)
