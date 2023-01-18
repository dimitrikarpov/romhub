import {
  CollaborateIcon,
  PencilIcon,
  RubbishBinIcon,
  ShareIcon,
  ShevronDownIcon,
  ThreeDotsMenu,
} from "@/components/icons"
import { Playlist, User } from "@prisma/client"
import TimeAgo from "javascript-time-ago"
import styles from "./PlaylistSidebar.module.css"

import en from "javascript-time-ago/locale/en"
import { IconButton } from "@/components/icon-button/IconButton"
import { Menu } from "@/components/menu/Menu"

TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo("en-US")

type Props = {
  playlist: Playlist & { User: User }
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
  return (
    <div className={styles["sidebar"]}>
      <img
        src={thumbnail}
        className={styles["thumbnail"]}
        alt="playlist thumbnail"
      />

      <div className={styles["title-container"]}>
        <div className={styles["title"]}>
          <div className={styles["title-text"]}>{playlist.title}</div>
          <IconButton icon={PencilIcon} />
        </div>
      </div>

      <div className={styles["author"]}>{playlist.User.name}</div>

      <div className={styles["privacy"]}>
        <div className={styles["privacy-input"]}>
          <div className={styles["privacy-input-value"]}>
            {playlist.isPublic ? "public" : "private"}
          </div>
          <div className={styles["privacy-input-icon"]}>
            <ShevronDownIcon />
          </div>
        </div>
      </div>

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
        <IconButton icon={ShareIcon} />
        <IconButton icon={ThreeDotsMenu} />

        <Menu>
          <Menu.Handler>
            <IconButton icon={ThreeDotsMenu} />
          </Menu.Handler>
          <Menu.List>
            <Menu.Item icon={CollaborateIcon} text="Collaborate" />
            <Menu.Item icon={RubbishBinIcon} text="Delete Playlist" />
            <Menu.Item icon={CollaborateIcon} text="Add all to..." />
          </Menu.List>
        </Menu>

        <Menu>
          <Menu.Handler>
            <IconButton icon={ThreeDotsMenu} />
          </Menu.Handler>
          <Menu.List>
            <Menu.Item icon={CollaborateIcon} text="Collaborate" />
            <Menu.Item icon={RubbishBinIcon} text="Delete Playlist" />
            <Menu.Item icon={CollaborateIcon} text="Add all to..." />
          </Menu.List>
        </Menu>

        <Menu>
          <Menu.Handler>
            <IconButton icon={ThreeDotsMenu} />
          </Menu.Handler>
          <Menu.List>
            <Menu.Item icon={CollaborateIcon} text="Collaborate" />
            <Menu.Item icon={RubbishBinIcon} text="Delete Playlist" />
            <Menu.Item icon={CollaborateIcon} text="Add all to..." />
          </Menu.List>
        </Menu>
      </div>

      <div className={styles["description-container"]}>
        <div className={styles["description"]}>
          <div className={styles["description-text"]}>
            {playlist.description || "No description"}
          </div>
          <IconButton icon={PencilIcon} />
        </div>
      </div>
    </div>
  )
}
