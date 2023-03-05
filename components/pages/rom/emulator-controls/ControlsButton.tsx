import { GamepadIcon } from "@/components/ui/icons"
import { DialogBox } from "@/components/ui/modal/DialogBox"
import { Modal } from "@/components/ui/modal/Modal"
import { useModal } from "@/components/ui/modal/useModal"
import { Controls } from "../controls/Controls"
import {
  nesControlsConfig,
  segaMDControlsConfig,
} from "../controls/controls-configs"
import styles from "../EmulatorComponent.module.css"

type Props = {
  platform: string
}

export const ControlsButton: React.FunctionComponent<Props> = ({
  platform,
}) => {
  const { visible, show, close } = useModal()

  const config = getControls(platform)

  return (
    <>
      <span onClick={show} title="Controls" className={styles["controls-icon"]}>
        <GamepadIcon />
      </span>

      {visible && (
        <Modal>
          <DialogBox title="controls" close={close}>
            <Controls config={config} />
          </DialogBox>
        </Modal>
      )}
    </>
  )
}

const getControls = (platform: string) => {
  switch (platform) {
    case "nes":
      return nesControlsConfig

    case "md":
      return segaMDControlsConfig

    default:
      throw new Error("no config found")
  }
}

/*
const keyConfig = {
  "⬆️": "up",
  "⬇️": "down",
  "⬅️": "left",
  "➡️": "right",
  start: "enter",
  select: "space",
  A: "x",
  B: "z",
  X: "s",
  Y: "a",
  L: "q",
  R: "w",
}
*/
