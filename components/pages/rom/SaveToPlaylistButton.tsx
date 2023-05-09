import { SaveToPlaylist } from "~/components/features/save-to-playlist/SaveToPlaylist"
import { ListPlusIcon } from "lucide-react"
import { DialogBox } from "~/components/ui/modal/DialogBox"
import { Modal } from "~/components/ui/modal/Modal"
import { useModal } from "~/components/ui/modal/useModal"
import { YTButton } from "~/components/ui/button/YTButton"

type Props = {
  romId: string
}

export const SaveToPlaylistButton: React.FunctionComponent<Props> = ({
  romId,
}) => {
  const { visible, show, close } = useModal()

  return (
    <>
      <YTButton onClick={show}>
        <ListPlusIcon />
        Save
      </YTButton>

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
