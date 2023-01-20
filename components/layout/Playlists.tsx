import { useSession } from "next-auth/react"
import { usePlaylistsQuery } from "./usePlaylistsQuery"
import styles from "../../styles/Layout.module.css"
import { HistoryIcon, PlaylistIcon, WatchLaterIcon } from "../icons"
import { TPlaylistType } from "../../types/index"

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

const getUrl = (type: TPlaylistType, id: string) => {
  switch (type) {
    case "history":
      return "/history"
    default:
      return `/playlist/${id}`
  }
}

export const Playlists = () => {
  const { data: session } = useSession()
  const playlistQuery = usePlaylistsQuery(session?.user.id)

  return (
    <>
      {session?.user.id &&
        playlistQuery.data?.map(({ type, title, id }) => {
          const Icon = getIconByType(type as TPlaylistType)
          return (
            <div className={styles.sideBarSection} key={id}>
              <a href={getUrl(type as TPlaylistType, id)}>
                <div className={styles.sideBarSectionItem}>
                  <Icon />
                  <p>{title}</p>
                </div>
              </a>
            </div>
          )
        })}
    </>
  )
}
