import {
  SquareIcon,
  ChevronDownSquareIcon,
  Globe2Icon,
  LockIcon,
} from "lucide-react"
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
      <div>
        {!!isChecked && <ChevronDownSquareIcon fill="#3ea6ff" />}
        {!isChecked && <SquareIcon />}
      </div>
      <div>{title}</div>
      <div>
        {!!isPublic && <Globe2Icon width={18} height={18} />}
        {!isPublic && <LockIcon width={18} height={18} />}
      </div>
    </div>
  )
}
