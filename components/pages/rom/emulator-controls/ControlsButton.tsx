import { Controls } from "../controls/Controls"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog/dialog"
import {
  nesControlsConfig,
  segaMDControlsConfig,
} from "../controls/controls-configs"
import { GamepadIcon } from "./Icons"
import { TPlatformSlug } from "~/types/index"

type Props = {
  platform: TPlatformSlug
}

export const ControlsButton: React.FunctionComponent<Props> = ({
  platform,
}) => {
  const config = getControls(platform)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span>
          <GamepadIcon />
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>controls</DialogTitle>
        </DialogHeader>
        <Controls config={config} />
      </DialogContent>
    </Dialog>
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
