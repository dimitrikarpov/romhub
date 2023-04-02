import { TPlatformSlug } from "@/types/index"
import { DialogBox } from "@/components/ui/modal/DialogBox"
import { Modal } from "@/components/ui/modal/Modal"
import { Controls } from "../controls/Controls"
import {
  nesControlsConfig,
  segaMDControlsConfig,
} from "../controls/controls-configs"

type Props = {
  platform: TPlatformSlug
  close: () => void
}

export const ControlsModal: React.FunctionComponent<Props> = ({
  platform,
  close,
}) => {
  const config = getControls(platform)

  return (
    <Modal>
      <DialogBox title="controls" close={close}>
        <Controls config={config} />
      </DialogBox>
    </Modal>
  )
}

const getControls = (platform: TPlatformSlug) => {
  switch (platform) {
    case "nes":
      return nesControlsConfig

    case "md":
      return segaMDControlsConfig

    default:
      throw new Error("no config found")
  }
}
