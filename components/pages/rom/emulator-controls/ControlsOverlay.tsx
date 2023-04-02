import { Dispatch, RefObject, SetStateAction, useRef, useState } from "react"
import classNames from "classnames"
import { UiRom } from "@/types/index"
import { ControlsButton } from "./ControlsButton"
import { FullscreenButton } from "./FullscreenButton"
import { PlayPauseButton } from "./PlayPauseButton"
import { TheaterModButton } from "./TheaterModButton"
import styles from "../EmulatorComponent.module.css"
import { ControlsModal } from "./ControlsModal"
import { useModal } from "@/components/ui/modal/useModal"

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
  const timerRef = useRef<NodeJS.Timeout>()
  const [visible, setVisible] = useState(false)
  const {
    visible: controlsModalVisible,
    show: showControlsModal,
    close: closeControlsModal,
  } = useModal()

  const onMouseMove = () => {
    !visible && setVisible(true)

    timerRef.current && clearTimeout(timerRef.current)

    timerRef.current = setTimeout(() => {
      setVisible(false)
    }, 1000)
  }

  const onMouseLeave = () => {
    timerRef.current && clearTimeout(timerRef.current)
    setVisible(false)
  }

  return (
    <>
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
            <ControlsButton show={showControlsModal} />
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
      {controlsModalVisible && (
        <ControlsModal platform={rom.platform} close={closeControlsModal} />
      )}
    </>
  )
}
