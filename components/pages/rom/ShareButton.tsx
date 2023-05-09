import { Share2Icon } from "lucide-react"
import { Share } from "~/components/features/share/Share"
import { YTButton } from "~/components/ui/button/YTButton"
import { DialogBox } from "~/components/ui/modal/DialogBox"
import { Modal } from "~/components/ui/modal/Modal"
import { useModal } from "~/components/ui/modal/useModal"

export const ShareButton = () => {
  const { visible, show, close } = useModal()

  return (
    <>
      <YTButton onClick={show}>
        <Share2Icon />
        Share
      </YTButton>

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
