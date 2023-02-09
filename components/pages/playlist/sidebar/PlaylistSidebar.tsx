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
import styles from "./PlaylistSidebar.module.css"
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
    <div className={styles["sidebar"]}>
      <img
        src={thumbnail}
        className={styles["thumbnail"]}
        alt="playlist thumbnail"
      />

      <Title text={playlist.title} editable={isTitleEditable} />

      <div className={styles["author"]}>by {playlist.author.name}</div>

      {isPrivacyEditable && <PrivacySelect isPublic={playlist.isPublic} />}

      <div className={styles["meta-container"]}>
        <div>{total} games</div>
        <div>
          Updated{" "}
          {lastUpdated ? timeAgo.format(lastUpdated, "round-minute") : "never"}
        </div>
      </div>

      <div className={styles["controls-container"]}>
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
