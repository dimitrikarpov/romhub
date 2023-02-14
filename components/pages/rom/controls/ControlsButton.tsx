import { Button } from "@/components/ui/button/Button"
import { GamepadIcon } from "@/components/ui/icons"
import { DialogBox } from "@/components/ui/modal/DialogBox"
import { Modal } from "@/components/ui/modal/Modal"
import { useModal } from "@/components/ui/modal/useModal"
import { Controls } from "./Controls"
import { nesControlsConfig } from "./controls-configs"

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
      <Button onClick={show}>
        <GamepadIcon />
        Controls
      </Button>

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
