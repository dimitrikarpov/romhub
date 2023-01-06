import { useSession } from "next-auth/react"
import { usePlaylistsQuery } from "./usePlaylistsQuery"
import styles from "../../styles/Layout.module.css"
import { HistoryIcon, PlaylistIcon, WatchLaterIcon } from "../icons"
import { TPlaylistType } from "../../types"

const getIconByType = (type: TPlaylistType) => {
  switch (type) {
    case "history":
      return HistoryIcon
    case "watch_later":
      return WatchLaterIcon
    default:
      return PlaylistIcon
  }
}

export const Playlists = () => {
  const { data: session } = useSession()
  const playlistQuery = usePlaylistsQuery(session?.user.id)

  return (
    <>
      {session?.user.id &&
        playlistQuery.data?.map(({ type, title }) => {
          const Icon = getIconByType(type as TPlaylistType)
          return (
            <div className={styles.sideBarSection}>
              <div className={styles.sideBarSectionItem}>
                <Icon />
                <p>{title}</p>
              </div>
            </div>
          )
        })}
    </>
  )
}
