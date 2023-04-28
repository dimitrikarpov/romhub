import {
  CheckboxBlankIcon,
  CheckboxCheckedIcon,
  GlobeIcon,
  LockIcon,
} from "~/components/ui/icons"
import clsx from "clsx"
import { type CreatePlaylistEntry } from "~/lib/queries/db/createPlaylistEntry"
import { useGenericMutation } from "~/lib/fetcher"
import { type DeletePlaylistEntryByRom } from "~/lib/queries/db/deletePlaylistEntryByRom"

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
  const addMutation = useGenericMutation<CreatePlaylistEntry>(
    { url: "/api/playlists/entries", options: { method: "POST" } },
    {
      invalidateQueries: ["/api/playlists/contains-rom"],
    },
  )

  const deleteMutation = useGenericMutation<DeletePlaylistEntryByRom>(
    {
      url: "/api/playlists/entries/delete-by-rom-id",
      options: { method: "DELETE" },
    },
    {
      invalidateQueries: ["/api/playlists/contains-rom"],
    },
  )

  const onClick = () => {
    if (isChecked) {
      deleteMutation.mutate({ search: { playlistId, romId } })
    }

    if (!isChecked) {
      addMutation.mutate({ search: { playlistId, romId } })
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
