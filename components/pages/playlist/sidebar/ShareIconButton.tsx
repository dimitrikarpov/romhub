import { Share2Icon } from "lucide-react"
import { Share } from "~/components/features/share/Share"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog/dialog"
import { IconButton } from "~/components/ui/icon-button/IconButton"

export const ShareIconButton = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <IconButton>
          <Share2Icon />
        </IconButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share</DialogTitle>
        </DialogHeader>

        <Share />
      </DialogContent>
    </Dialog>
  )
}
