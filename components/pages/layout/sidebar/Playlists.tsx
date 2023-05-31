import {
  HistoryIcon,
  ListVideo as PlaylistIcon,
  Clock as WatchLaterIcon,
} from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useFetch } from "~/lib/fetcher"
import { type GetUserPlaylists } from "~/lib/queries/db/getUserPlaylists"
import { TPlaylistType } from "~/types/index"

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

  const playlistQuery = useFetch<GetUserPlaylists>(
    { url: "/api/playlists" },
    { staleTime: 5 * 60 * 1000, enabled: Boolean(session?.user.id) },
  )

  return (
    <>
      {session?.user.id &&
        playlistQuery.data?.map(({ type, title, id }) => {
          const Icon = getIconByType(type as TPlaylistType)
          return (
            <Link href={getUrl(type as TPlaylistType, id)} key={id}>
              <div className="sidebarItem">
                <Icon />
                <p>{title}</p>
              </div>
            </Link>
          )
        })}
    </>
  )
}
