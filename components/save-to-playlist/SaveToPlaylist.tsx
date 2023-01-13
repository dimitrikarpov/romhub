import { useSession } from "next-auth/react"
import { CrossIcon, PlusIcon } from "@/components/icons"
import { usePlaylistsQuery } from "../layout/usePlaylistsQuery"
import { PlaylistEntry } from "./PlaylistEntry"
import styles from "./save-to-playlist.module.css"
import { usePlaylistWithRomQuery } from "./usePlaylistsWithRomQuery"
import { useState } from "react"
import { CreatePlaylistForm } from "./CreatePlaylistForm"

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

  const playlistsQuery = usePlaylistsQuery(session?.user.id, true)
  const playlistsWithRomQuery = usePlaylistWithRomQuery(
    session?.user.id,
    romId,
    true,
  )

  const onDialogClose = () => {
    setIsFormOpened(false)
    onClose()
  }

  const onFormOpen = () => {
    setIsFormOpened(true)
  }

  console.log({
    playlistsQuery: playlistsQuery.data,
    playlistsWithRomQuery: playlistsWithRomQuery.data,
  })

  return (
    <div className={styles["save-dialog"]}>
      <header>
        <div>Save to...</div>
        <div onClick={onDialogClose} className={styles["close-btn"]}>
          <CrossIcon />
        </div>
      </header>

      <main>
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
      </main>

      <footer>
        {isFormOpened ? (
          <CreatePlaylistForm />
        ) : (
          <div className={styles["create-btn"]} onClick={onFormOpen}>
            <PlusIcon />
            <div>Create new playlist</div>
          </div>
        )}
      </footer>
    </div>
  )
}
