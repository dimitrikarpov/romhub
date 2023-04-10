import { useRouter } from "next/router"
import { RubbishBinIcon } from "@/components/ui/icons"
import { Playlist, User } from "@prisma/client"
import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en"
import { IconButton } from "@/components/ui/icon-button/IconButton"
import { Title } from "./title/Title"
import { Description } from "./description/Description"
import { PrivacySelect } from "./PrivacySelect"
import { Session } from "next-auth"
import { useSession } from "next-auth/react"
import { ShareIconButton } from "./ShareIconButton"
import { useDeletePlaylistMutation } from "@/lib/queries/react/useDeletePlaylistMutation"
import { SaveOrDeleteSharedPlaylistButton } from "./SaveOrDeleteSharedPlaylistButton"

// TODO: make a singleton to prevent
//  [javascript-time-ago] `TimeAgo.addDefaultLocale()` can only be called once. To add other locales, use `TimeAgo.addLocale()`.
// or use https://github.com/catamphetamine/javascript-time-ago/issues/52
TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo("en-US")

type Props = {
  playlist: Playlist & { author: User }
  thumbnail?: string
  total: number
  lastUpdated?: Date
}

export const PlaylistSidebar: React.FunctionComponent<Props> = ({
  playlist,
  thumbnail,
  total,
  lastUpdated,
}) => {
  const router = useRouter()

  const { data: session } = useSession()

  const isTitleEditable = canEditPlaylistTitle(session, playlist)
  const isDescriptionEditable = canEditPlaylistDescription(session, playlist)
  const isPrivacyEditable = canEditPlaylistPrivacy(session, playlist)
  const isShareVisible = canSharePlaylist(playlist)
  const isDeleteOwnPlaylistVisible = canDeleteOwnPlaylist(session, playlist)

  const deleteOwnPlaylistMutation = useDeletePlaylistMutation({
    onSuccess: () => {
      router.push("/")
    },
  })

  const onDeleteOwnPlaylistClick = () => {
    deleteOwnPlaylistMutation.mutate({ playlistId: playlist.id })
  }

  return (
    <div className="flex h-[876px] w-full max-w-[23rem] flex-col gap-6 rounded-2xl bg-gradient-to-b from-[rgba(60,65,114,0.8)] to-[rgba(15,15,15,1)] p-6">
      <img
        src={thumbnail}
        className="w-full rounded-xl"
        alt="playlist thumbnail"
      />

      <Title text={playlist.title} editable={isTitleEditable} />

      <div className="text-sm font-medium leading-8">
        by {playlist.author.name}
      </div>

      {isPrivacyEditable && <PrivacySelect isPublic={playlist.isPublic} />}

      <div className="flex gap-4 text-xs font-normal leading-5 text-[#ffffffb3]">
        <div>{total} games</div>
        <div>
          Updated{" "}
          {lastUpdated ? timeAgo.format(lastUpdated, "round-minute") : "never"}
        </div>
      </div>

      <div className="flex gap-4">
        {isShareVisible && <ShareIconButton />}

        <SaveOrDeleteSharedPlaylistButton playlist={playlist} />

        {isDeleteOwnPlaylistVisible && (
          <IconButton
            icon={RubbishBinIcon}
            tip="Delete Playlist"
            onClick={onDeleteOwnPlaylistClick}
          />
        )}
      </div>

      <Description
        text={playlist.description || "No description"}
        editable={isDescriptionEditable}
      />
    </div>
  )
}

// TODO: [permisson]
const canEditPlaylistTitle = (session: Session | null, playlist: Playlist) => {
  return (
    Boolean(session) &&
    playlist.authorId === session?.user.id &&
    playlist.type !== "watch_later"
  )
}

// TODO: [permisson]
const canEditPlaylistDescription = (
  session: Session | null,
  playlist: Playlist,
) => {
  return (
    Boolean(session) &&
    playlist.authorId === session?.user.id &&
    playlist.type !== "watch_later"
  )
}

// TODO: [permisson]
const canEditPlaylistPrivacy = (
  session: Session | null,
  playlist: Playlist,
) => {
  return (
    Boolean(session) &&
    playlist.authorId === session?.user.id &&
    playlist.type !== "watch_later"
  )
}

// TODO: [permisson]
const canSharePlaylist = (playlist: Playlist) => {
  return playlist.isPublic && playlist.type === "custom"
}

// TODO: [permisson]
const canDeleteOwnPlaylist = (session: Session | null, playlist: Playlist) => {
  return (
    session &&
    session.user.id === playlist.authorId &&
    playlist.type === "custom"
  )
}
