import {
  CheckboxBlankIcon,
  CheckboxCheckedIcon,
  GlobeIcon,
  LockIcon,
} from "@/components/ui/icons"
import { useCreatePlaylistEntryMutation } from "@/lib/queries/react/useCreatePlaylistEntryMutation"
import { useDeletePlaylistEntryByRomMutation } from "@/lib/queries/react/useDeletePlaylistEntryByRomMutation"
import clsx from "clsx"

type Props = {
  title: string
  isChecked: boolean
  isPublic: boolean
  playlistId: string
  romId: string
}

export const PlaylistEntry: React.FunctionComponent<Props> = ({
  title,
  isChecked,
  isPublic,
  playlistId,
  romId,
}) => {
  const addMutation = useCreatePlaylistEntryMutation({})
  const deleteMutation = useDeletePlaylistEntryByRomMutation({})

  const onClick = () => {
    if (isChecked) {
      deleteMutation.mutate({ playlistId, romId })
    }

    if (!isChecked) {
      addMutation.mutate({ playlistId, romId })
    }
  }

  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer items-center justify-between"
    >
      <div
        className={clsx(
          "c-svg-24 c-svg-w",
          isChecked && "[&_svg]:fill-[#3ea6ff]",
        )}
      >
        {isChecked ? <CheckboxCheckedIcon /> : <CheckboxBlankIcon />}
      </div>
      <div>{title}</div>
      <div className="c-svg-18 c-svg-w">
        {isPublic ? <GlobeIcon /> : <LockIcon />}
      </div>
    </div>
  )
}
