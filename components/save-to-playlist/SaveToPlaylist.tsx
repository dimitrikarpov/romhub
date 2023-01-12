import { useSession } from "next-auth/react"
import { CrossIcon, PlusIcon } from "@/components/icons"
import { usePlaylistsQuery } from "../layout/usePlaylistsQuery"
import { PlaylistEntry } from "./PlaylistEntry"
import styles from "./save-to-playlist.module.css"
import { usePlaylistWithRomQuery } from "./usePlaylistsWithRomQuery"

type Props = {
  romId: string
  onClose: () => void
}

export const SaveToPlaylist: React.FunctionComponent<Props> = ({
  romId,
  onClose,
}) => {
  const { data: session } = useSession()

  const playlistsQuery = usePlaylistsQuery(session?.user.id, true)
  const playlistsWithRomQuery = usePlaylistWithRomQuery(
    session?.user.id,
    romId,
    true,
  )

  console.log({
    playlistsQuery: playlistsQuery.data,
    playlistsWithRomQuery: playlistsWithRomQuery.data,
  })

  return (
    <div className={styles["save-dialog"]}>
      <header>
        <div>Save to...</div>
        <div onClick={() => onClose()} className={styles["close-btn"]}>
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
              key={id}
            />
          ))}
      </main>

      <footer>
        <div className={styles["add-btn"]}>
          <PlusIcon />
        </div>
        <div>Create new playlist</div>
      </footer>
    </div>
  )
}
