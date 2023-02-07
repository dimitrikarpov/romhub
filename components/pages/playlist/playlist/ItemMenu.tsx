import { SaveToPlaylist } from "@/components/features/save-to-playlist/SaveToPlaylist"
import { IconButton } from "@/components/ui/icon-button/IconButton"
import {
  ThreeDotsMenu,
  WatchLaterIcon,
  AddToPlaylistIcon,
  DownloadIcon,
  ShareIcon,
  RubbishBinIcon,
} from "@/components/ui/icons"
import { Menu } from "@/components/ui/menu/Menu"
import { DialogBox } from "@/components/ui/modal/DialogBox"
import { Modal } from "@/components/ui/modal/Modal"
import { useModal } from "@/components/ui/modal/useModal"
import { useAddToWatchLaterMutation } from "@/lib/queries/react/useAddToWatchLaterMutation"
import { UiPlaylistEntry } from "@/types/index"
import { Session } from "next-auth"
import { useSession } from "next-auth/react"

type Props = {
  entry: UiPlaylistEntry
}

export const ItemMenu: React.FunctionComponent<Props> = ({ entry }) => {
  const { data: session } = useSession()
  const displaySaveToDialog = canSaveRomToOwnPlaylist(session)
  const displayDeleteEntryItem = canDeletePlaylistEntryById(session, entry)

  const { visible, show, close } = useModal()

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

        {displaySaveToDialog && (
          <div onClick={show}>
            <Menu.Item.IconAndText
              icon={AddToPlaylistIcon}
              text="Save to playlist"
            />
          </div>
        )}

        <a href={entry.rom.file}>
          <Menu.Item.IconAndText icon={DownloadIcon} text="Download" />
        </a>

        <Menu.Item.IconAndText icon={ShareIcon} text="Share" />

        {displayDeleteEntryItem && (
          <div>
            <Menu.Item.IconAndText
              icon={RubbishBinIcon}
              text={`Remove from ${entry.playlist.title}`}
            />
          </div>
        )}
      </Menu.List>

      {visible && (
        <Modal>
          <DialogBox title="Save to..." close={close}>
            <SaveToPlaylist romId={entry.romId} onClose={close} />
          </DialogBox>
        </Modal>
      )}
    </Menu>
  )
}

// TODO: [permisson]
const canSaveRomToOwnPlaylist = (session: Session | null) => {
  return Boolean(session)
}

// TODO: [permisson]
const canDeletePlaylistEntryById = (
  session: Session | null,
  entry: UiPlaylistEntry,
) => {
  return session && session.user.id === entry.playlist.authorId
}
