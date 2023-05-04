import { Share2Icon } from "lucide-react"
import { Share } from "~/components/features/share/Share"
import { IconButton } from "~/components/ui/icon-button/IconButton"
import { DialogBox } from "~/components/ui/modal/DialogBox"
import { Modal } from "~/components/ui/modal/Modal"
import { useModal } from "~/components/ui/modal/useModal"

export const ShareIconButton = () => {
  const { visible, show, close } = useModal()

  return (
    <>
      <IconButton onClick={show}>
        <Share2Icon />
      </IconButton>

      {visible && (
        <Modal>
          <DialogBox title="Share" close={close}>
            <Share />
          </DialogBox>
        </Modal>
      )}
    </>
  )
}
