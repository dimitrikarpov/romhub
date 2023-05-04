import { Share2Icon } from "lucide-react"
import { Share } from "~/components/features/share/Share"
import { Button } from "~/components/ui/button/Button"
import { DialogBox } from "~/components/ui/modal/DialogBox"
import { Modal } from "~/components/ui/modal/Modal"
import { useModal } from "~/components/ui/modal/useModal"

export const ShareButton = () => {
  const { visible, show, close } = useModal()

  return (
    <>
      <Button onClick={show}>
        <Share2Icon />
        Share
      </Button>

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
