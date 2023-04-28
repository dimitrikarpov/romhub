import { SaveToPlaylist } from "~/components/features/save-to-playlist/SaveToPlaylist"
import { Button } from "~/components/ui/button/Button"
import { AddToPlaylistIcon } from "~/components/ui/icons"
import { DialogBox } from "~/components/ui/modal/DialogBox"
import { Modal } from "~/components/ui/modal/Modal"
import { useModal } from "~/components/ui/modal/useModal"

type Props = {
  romId: string
}

export const SaveToPlaylistButton: React.FunctionComponent<Props> = ({
  romId,
}) => {
  const { visible, show, close } = useModal()

  return (
    <>
      <Button onClick={show}>
        <AddToPlaylistIcon />
        Save
      </Button>

      {visible && (
        <Modal>
          <DialogBox title="Save to..." close={close}>
            <SaveToPlaylist romId={romId} onClose={close} />
          </DialogBox>
        </Modal>
      )}
    </>
  )
}
