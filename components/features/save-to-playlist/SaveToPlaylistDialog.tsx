import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog/dialog"
import { SaveToPlaylist } from "./SaveToPlaylist"

type Props = {
  romId: string
  children?: React.ReactNode
}

export const SaveToPlaylistDialog: React.FunctionComponent<Props> = ({
  romId,
  children,
}) => {
  const [open, setOpen] = useState(false)

  const onClose = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-fit max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Save to...</DialogTitle>
        </DialogHeader>

        <SaveToPlaylist romId={romId} onClose={onClose} />
      </DialogContent>
    </Dialog>
  )
}
