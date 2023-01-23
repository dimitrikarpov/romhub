import {
  CollaborateIcon,
  PencilIcon,
  RubbishBinIcon,
  ShareIcon,
  ShevronDownIcon,
  ThreeDotsMenu,
} from "@/components/ui/icons"
import { Playlist, User } from "@prisma/client"
import TimeAgo from "javascript-time-ago"
import styles from "./PlaylistSidebar.module.css"

import en from "javascript-time-ago/locale/en"
import { IconButton } from "@/components/ui/icon-button/IconButton"
import { Menu } from "@/components/ui/menu/Menu"
import { Title } from "./Title"

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

      <Title text={playlist.title} />

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