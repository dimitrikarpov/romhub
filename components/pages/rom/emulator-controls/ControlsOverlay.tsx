import { useModal } from "~/components/ui/modal/useModal"
import { UiRom } from "~/types/index"
import clsx from "clsx"
import { Dispatch, RefObject, SetStateAction, useRef, useState } from "react"
import { ControlsButton } from "./ControlsButton"
import { ControlsModal } from "./ControlsModal"
import { FullscreenButton } from "./FullscreenButton"
import { PlayPauseButton } from "./PlayPauseButton"
import { TheaterModButton } from "./TheaterModButton"

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
    }, 3000)
  }

  const onMouseLeave = () => {
    timerRef.current && clearTimeout(timerRef.current)
    setVisible(false)
  }

  return (
    <>
      <div
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
        className={clsx(
          "absolute inset-0 flex flex-col justify-end",
          visible && "cursor-default opacity-100",
          !visible && "cursor-none opacity-0",
        )}
      >
        <div className="flex h-[50px] items-center justify-between bg-[rgba(12,12,12,0.719)] px-5 py-0 [&_svg]:h-[48px] [&_svg]:w-[48px] [&_svg]:cursor-pointer [&_svg]:fill-white [&_svg]:opacity-90 hover:[&_svg]:opacity-100">
          <div>
            <PlayPauseButton />
          </div>
          <div>
            <ControlsButton show={showControlsModal} />
          </div>
          <div className="flex">
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
