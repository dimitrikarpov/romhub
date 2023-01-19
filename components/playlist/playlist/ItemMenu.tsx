import { IconButton } from "@/components/icon-button/IconButton"
import {
  ThreeDotsMenu,
  WatchLaterIcon,
  AddToPlaylistIcon,
  DownloadIcon,
  ShareIcon,
} from "@/components/icons"
import { Menu } from "@/components/menu/Menu"
import { UiPlaylistEntry } from "@/types/index"

type Props = {
  entry: UiPlaylistEntry
}

export const ItemMenu: React.FunctionComponent<Props> = ({ entry }) => {
  return (
    <Menu>
      <Menu.Handler>
        <IconButton icon={ThreeDotsMenu} />
      </Menu.Handler>
      <Menu.List position="left">
        <Menu.Item.IconAndText
          icon={WatchLaterIcon}
          text="Save to Watch Later"
        />
        <Menu.Item.IconAndText
          icon={AddToPlaylistIcon}
          text="Save to playlist"
        />
        <Menu.Item.IconAndText icon={DownloadIcon} text="Download" />
        <Menu.Item.IconAndText icon={ShareIcon} text="Share" />
      </Menu.List>
    </Menu>
  )
}

/**
 * Shared:
 * - Save to Watch Later
 * - Savt to playlist
 * - Download
 * - Share
 *
 * Own:
 * - Remove from [playlist-name]
 */
