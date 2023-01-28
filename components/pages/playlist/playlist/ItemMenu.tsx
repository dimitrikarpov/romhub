import { IconButton } from "@/components/ui/icon-button/IconButton"
import {
  ThreeDotsMenu,
  WatchLaterIcon,
  AddToPlaylistIcon,
  DownloadIcon,
  ShareIcon,
} from "@/components/ui/icons"
import { Menu } from "@/components/ui/menu/Menu"
import { useAddToWatchLaterMutation } from "@/lib/queries/react-queries/useAddToWatchLaterMutation"
import { UiPlaylistEntry } from "@/types/index"
import { useSession } from "next-auth/react"

type Props = {
  entry: UiPlaylistEntry
  onSaveToPlaylistClick: () => void
}

export const ItemMenu: React.FunctionComponent<Props> = ({
  entry,
  onSaveToPlaylistClick,
}) => {
  const { data: session } = useSession()

  const addToWatchLaterMutation = useAddToWatchLaterMutation(entry.romId)

  const onSaveToWatchLaterClick = () => {
    addToWatchLaterMutation.mutate()
  }

  return (
    <Menu>
      <Menu.Handler>
        <IconButton icon={ThreeDotsMenu} />
      </Menu.Handler>
      <Menu.List position="left">
        {session && (
          <div onClick={onSaveToWatchLaterClick}>
            <Menu.Item.IconAndText
              icon={WatchLaterIcon}
              text="Save to Watch Later"
            />
          </div>
        )}

        <div onClick={onSaveToPlaylistClick}>
          <Menu.Item.IconAndText
            icon={AddToPlaylistIcon}
            text="Save to playlist"
          />
        </div>

        <a href={entry.rom.file}>
          <Menu.Item.IconAndText icon={DownloadIcon} text="Download" />
        </a>

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
