import {
  CollaborateIcon,
  RubbishBinIcon,
  ShareIcon,
  ThreeDotsMenu,
} from "@/components/ui/icons"
import { Playlist, User } from "@prisma/client"
import TimeAgo from "javascript-time-ago"
import styles from "./PlaylistSidebar.module.css"

import en from "javascript-time-ago/locale/en"
import { IconButton } from "@/components/ui/icon-button/IconButton"
import { Menu } from "@/components/ui/menu/Menu"
import { Title } from "./Title"
import { Description } from "./Description"

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
  return (
    <div className={styles["sidebar"]}>
      <img
        src={thumbnail}
        className={styles["thumbnail"]}
        alt="playlist thumbnail"
      />

      <Title text={playlist.title} />

      <div className={styles["author"]}>by {playlist.author.name}</div>

      <div className={styles["privacy"]}>
        <select>
          <option>Private</option>
          <option>Public</option>
        </select>
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

      <Description text={playlist.description || "No description"} />
    </div>
  )
}
