import { useState } from "react"
import { useSession } from "next-auth/react"
import { CrossIcon, PlusIcon } from "@/components/ui/icons"
import { PlaylistEntry } from "./PlaylistEntry"
import { usePlaylistWithRomQuery } from "@/lib/queries/react/usePlaylistsWithRomQuery"
import { CreatePlaylistForm, IFormInput } from "./CreatePlaylistForm"
import { useCreatePlaylistEntryMutation } from "@/lib/queries/react/useCreatePlaylistEntryMutation"
import { useCreatePlaylistMutation } from "@/lib/queries/react/useCreatePlaylistMutation"
import { useUserPlaylistsQuery } from "@/lib/queries/react/useUserPlaylistsQuery"
import styles from "./save-to-playlist.module.css"

type Props = {
  romId: string
  onClose: () => void
}

export const SaveToPlaylist: React.FunctionComponent<Props> = ({
  romId,
  onClose,
}) => {
  const { data: session } = useSession()
  const [isFormOpened, setIsFormOpened] = useState(false)

  const onDialogClose = () => {
    setIsFormOpened(false)
    onClose()
  }

  const onFormOpen = () => {
    setIsFormOpened(true)
  }

  const playlistsQuery = useUserPlaylistsQuery(session?.user.id, true)
  const playlistsWithRomQuery = usePlaylistWithRomQuery(
    session?.user.id,
    romId,
    true,
  )
  const createPlaylistEntryMutation = useCreatePlaylistEntryMutation({
    onSuccess: onDialogClose,
  })
  const createPlaylistMutation = useCreatePlaylistMutation({
    onSuccess: (data) => {
      createPlaylistEntryMutation.mutate({ playlistId: data.id, romId })
    },
  })

  const onFormSubmit = async (data: IFormInput) => {
    createPlaylistMutation.mutate({
      type: "custom",
      isPublic: data.privacy === "public",
      title: data.title,
      userId: String(session?.user.id),
    })
  }

  return (
    <>
      <div className={styles["main"]}>
        {playlistsQuery.data
          ?.filter(({ type }) => type !== "history")
          .map(({ title, isPublic, id }) => (
            <PlaylistEntry
              title={title}
              isPublic={isPublic}
              isChecked={Boolean(
                playlistsWithRomQuery.data?.some((pl) => pl.id === id),
              )}
              playlistId={id}
              romId={romId}
              key={id}
            />
          ))}
      </div>

      <div className={styles["footer"]}>
        {isFormOpened ? (
          <CreatePlaylistForm onSubmit={onFormSubmit} />
        ) : (
          <div className={styles["create-btn"]} onClick={onFormOpen}>
            <PlusIcon />
            <div>Create new playlist</div>
          </div>
        )}
      </div>
    </>
  )
}
