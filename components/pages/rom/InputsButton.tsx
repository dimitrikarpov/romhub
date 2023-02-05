import { Button } from "@/components/ui/button/Button"
import { GamepadIcon } from "@/components/ui/icons"
import { DialogBox } from "@/components/ui/modal/DialogBox"
import { Modal } from "@/components/ui/modal/Modal"
import { useModal } from "@/components/ui/modal/useModal"
import { InputMapping } from "./InputMapping"

export const InputsButton = () => {
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
            <InputMapping />
          </DialogBox>
        </Modal>
      )}
    </>
  )
}
