import { memo, useEffect, useRef, useState } from "react"
import { useRetroarch } from "./useRetroarch"
import styles from "../../styles/Emulator.module.css"
import { Rom } from "../../types"
import { EmulatorBackdrop } from "./EmulatorBackdrop"

type Props = {
  coreUrl: string
  romBuffer: Uint8Array
  rom: Rom
}

export const EmulatorComponent: React.FunctionComponent<Props> = memo(
  ({ coreUrl, romBuffer, rom }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [showBackdrop, setShowBackdrop] = useState(true)
    const { status, retroarch } = useRetroarch(coreUrl, canvasRef)

    useEffect(() => {
      if (status === "inited") {
        retroarch?.copyConfig()
        retroarch?.copyRom(romBuffer)
      }
    }, [status])

    const onStartClick = () => {
      retroarch?.start()
      setShowBackdrop(false)
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

// style={{backgroundImage: `url(${rom.images[0]})`}}
