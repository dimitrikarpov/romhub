import { Share } from "@/components/features/share/Share"
import { IconButton } from "@/components/ui/icon-button/IconButton"
import { ShareIcon } from "@/components/ui/icons"
import { DialogBox } from "@/components/ui/modal/DialogBox"
import { Modal } from "@/components/ui/modal/Modal"
import { useModal } from "@/components/ui/modal/useModal"

export const ShareIconButton = () => {
  const { visible, show, close } = useModal()

  return (
    <>
      <IconButton icon={ShareIcon} onClick={show} />

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
