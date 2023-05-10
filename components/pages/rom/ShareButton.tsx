import { Share2Icon } from "lucide-react"
import { Share } from "~/components/features/share/Share"
import { YTButton } from "~/components/ui/button/YTButton"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog/dialog"

export const ShareButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <YTButton>
          <Share2Icon />
          Share
        </YTButton>
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
