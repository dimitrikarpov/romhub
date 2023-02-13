import { Button } from "@/components/ui/button/Button"
import { GamepadIcon } from "@/components/ui/icons"
import { DialogBox } from "@/components/ui/modal/DialogBox"
import { Modal } from "@/components/ui/modal/Modal"
import { useModal } from "@/components/ui/modal/useModal"
import { NesControls } from "./NesControls"

export const ControlsButton = () => {
  const { visible, show, close } = useModal()

  return (
    <>
      <Button onClick={show}>
        <GamepadIcon />
        Controls
      </Button>

      {visible && (
        <Modal>
          <DialogBox title="controls" close={close}>
            <NesControls />
          </DialogBox>
        </Modal>
      )}
    </>
  )
}
