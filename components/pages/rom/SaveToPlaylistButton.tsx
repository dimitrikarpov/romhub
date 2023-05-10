import { ListPlusIcon } from "lucide-react"
import { YTButton } from "~/components/ui/button/YTButton"
import { SaveToPlaylistDialog } from "~/components/features/save-to-playlist/SaveToPlaylistDialog"

type Props = {
  romId: string
}

export const SaveToPlaylistButton: React.FunctionComponent<Props> = ({
  romId,
}) => {
  return (
    <SaveToPlaylistDialog romId={romId}>
      <YTButton>
        <ListPlusIcon />
        Save
      </YTButton>
    </SaveToPlaylistDialog>
  )
}
