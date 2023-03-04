import { Dispatch, RefObject, SetStateAction, useState } from "react"
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
  const [visible, setVisible] = useState(false)

  const onMouseEnter = () => {
    setVisible(true)
  }

  const onMouseLeave = () => {
    setVisible(false)
  }

  return (
    <div
      className={classNames(styles["controls-overlay"], {
        [styles["controls-overlay--hidden"]]: !visible,
      })}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
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
