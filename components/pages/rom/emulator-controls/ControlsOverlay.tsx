import { Dispatch, RefObject, SetStateAction, useRef, useState } from "react"
import classNames from "classnames"
import { UiRom } from "@/types/index"
import { ControlsButton } from "./ControlsButton"
import { FullscreenButton } from "./FullscreenButton"
import { PlayPauseButton } from "./PlayPauseButton"
import { TheaterModButton } from "./TheaterModButton"
import styles from "../EmulatorComponent.module.css"

type Props = {
  canvasBoxRef: RefObject<HTMLDivElement>
  rom: UiRom
  isInTheaterMod: boolean
  setIsInTheaterMod: Dispatch<SetStateAction<boolean>>
}

export const ControlsOverlay: React.FunctionComponent<Props> = ({
  rom,
  isInTheaterMod,
  setIsInTheaterMod,
  canvasBoxRef,
}) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const [visible, setVisible] = useState(false)

  const onMouseMove = () => {
    !visible && setVisible(true)

    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    timerRef.current = setTimeout(() => {
      setVisible(false)
    }, 1000)
  }

  const onMouseLeave = () => {
    timerRef.current && clearTimeout(timerRef.current)
    setVisible(false)
  }

  return (
    <div
      className={classNames(styles["controls-overlay"], {
        [styles["controls-overlay--hidden"]]: !visible,
      })}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
    >
      <div className={styles["controls-container"]}>
        <div>
          <PlayPauseButton />
        </div>
        <div>
          <ControlsButton platform={rom.platform} />
        </div>
        <div>
          <TheaterModButton
            isInTheaterMod={isInTheaterMod}
            toggle={setIsInTheaterMod}
          />
          <FullscreenButton canvasBoxRef={canvasBoxRef} />
        </div>
      </div>
    </div>
  )
}
