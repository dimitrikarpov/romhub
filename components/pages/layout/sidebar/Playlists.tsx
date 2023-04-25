import { useSession } from "next-auth/react"
import {
  HistoryIcon,
  PlaylistIcon,
  WatchLaterIcon,
} from "~/components/ui/icons"
import { TPlaylistType } from "~/types/index"
import { useFetch } from "~/lib/fetcher"
import { FetchedDBQueryResult } from "~/types/utils"
import {
  type TGetUserPlaylistsParams,
  type TGetUserPlaylistsReturn,
} from "~/lib/queries/db/getUserPlaylists"

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

  const playlistQuery = useFetch<
    FetchedDBQueryResult<TGetUserPlaylistsReturn>,
    TGetUserPlaylistsParams
  >(
    { url: "/api/playlists" },
    { staleTime: 5 * 60 * 1000, enabled: Boolean(session?.user.id) },
  )

  return (
    <>
      {session?.user.id &&
        playlistQuery.data?.map(({ type, title, id }) => {
          const Icon = getIconByType(type as TPlaylistType)
          return (
            <a href={getUrl(type as TPlaylistType, id)} key={id}>
              <div className="sidebarItem">
                <Icon />
                <p>{title}</p>
              </div>
            </a>
          )
        })}
    </>
  )
}
