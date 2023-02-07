import {
  CollaborateIcon,
  RubbishBinIcon,
  ThreeDotsMenu,
} from "@/components/ui/icons"
import { Playlist, User } from "@prisma/client"
import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en"
import { IconButton } from "@/components/ui/icon-button/IconButton"
import { Menu } from "@/components/ui/menu/Menu"
import { Title } from "./title/Title"
import { Description } from "./description/Description"
import { PrivacySelect } from "./PrivacySelect"
import styles from "./PlaylistSidebar.module.css"
import { Session } from "next-auth"
import { useSession } from "next-auth/react"
import { ShareIconButton } from "./ShareIconButton"

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
  const { data: session } = useSession()

  const isTitleEditable = canEditPlaylistTitle(session, playlist)
  const isDescriptionEditable = canEditPlaylistDescription(session, playlist)
  const isPrivacyEditable = canEditPlaylistPrivacy(session, playlist)
  const isShareVisible = canSharePlaylist(playlist)

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
          {lastUpdated
            ? `${timeAgo.format(lastUpdated, "twitter")} ago`
            : "never"}
        </div>
      </div>

      <div className={styles["controls-container"]}>
        {isShareVisible && <ShareIconButton />}

        <Menu>
          <Menu.Handler>
            <IconButton icon={ThreeDotsMenu} />
          </Menu.Handler>
          <Menu.List>
            <Menu.Item>
              <div
                onClick={() => {
                  console.log("clicked")
                }}
              >
                <Menu.Item.IconAndText
                  icon={CollaborateIcon}
                  text="Collaborate"
                />
              </div>
              <Menu.Item.Divider />
              <Menu.Item.IconAndText
                icon={RubbishBinIcon}
                text="Delete Playlist"
              />
              <Menu.Item.IconAndText
                icon={CollaborateIcon}
                text="Add all to..."
              />
            </Menu.Item>
          </Menu.List>
        </Menu>
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
