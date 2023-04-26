import { SaveToPlaylist } from "~/components/features/save-to-playlist/SaveToPlaylist"
import { Share } from "~/components/features/share/Share"
import { IconButton } from "~/components/ui/icon-button/IconButton"
import {
  ThreeDotsMenu,
  WatchLaterIcon,
  AddToPlaylistIcon,
  DownloadIcon,
  ShareIcon,
  RubbishBinIcon,
} from "~/components/ui/icons"
import { Menu } from "~/components/ui/menu/Menu"
import { DialogBox } from "~/components/ui/modal/DialogBox"
import { Modal } from "~/components/ui/modal/Modal"
import { useModal } from "~/components/ui/modal/useModal"
import { downloadRom } from "~/lib/downloadRom"
import { UiPlaylistEntry } from "~/types/index"
import { Session } from "next-auth"
import { useSession } from "next-auth/react"
import { useQueryClient } from "react-query"
import { FetchedDBQueryResult } from "~/types/utils"
import { useGenericMutation } from "~/lib/fetcher"
import {
  type TDeletePlaylistEntryByRomParams,
  type TDeletePlaylistEntryByRomReturn,
} from "~/lib/queries/db/deletePlaylistEntryByRom"
import { useAddToWatchLaterMutation } from "./useAddToWatchLaterMutation"

type Props = {
  entry: UiPlaylistEntry
}

export const ItemMenu: React.FunctionComponent<Props> = ({ entry }) => {
  const queryClient = useQueryClient()

  const { data: session } = useSession()
  const displaySaveToDialog = canSaveRomToOwnPlaylist(session)
  const displayDeleteEntryItem = canDeletePlaylistEntryById(session, entry)

  const {
    visible: isSaveToVisible,
    show: showSaveTo,
    close: closeSaveTo,
  } = useModal()
  const {
    visible: isShareVisible,
    show: showShare,
    close: closeShare,
  } = useModal()

  const addToWatchLaterMutation = useAddToWatchLaterMutation(entry.romId)

  const deleteEntryMutation = useGenericMutation<
    FetchedDBQueryResult<TDeletePlaylistEntryByRomReturn>,
    TDeletePlaylistEntryByRomParams
  >(
    {
      url: "/api/playlists/entries/delete-by-rom-id",
      options: { method: "DELETE" },
    },
    {
      invalidateQueries: ["/api/playlists/entries"],
      onSuccess: () => {
        queryClient.invalidateQueries(["/api/playlists/contains-rom"])
      },
    },
    //     ["/api/playlists/entries", new URLSearchParams({ playlistId })].join("?"),
  )

  const onSaveToWatchLaterClick = () => {
    addToWatchLaterMutation.mutate({
      search: { playlistId: entry.playlistId, romId: entry.romId }, // TODO: instead of entry.playlistId use watch later
    })
  }

  const onDeleteClick = () => {
    deleteEntryMutation.mutate({
      search: { playlistId: entry.playlistId, romId: entry.romId },
    })
  }

  const onDownloadClick = () => {
    downloadRom(entry.rom.file, entry.rom.name)
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
          <div onClick={showSaveTo}>
            <Menu.Item.IconAndText
              icon={AddToPlaylistIcon}
              text="Save to playlist"
            />
          </div>
        )}

        <div onClick={onDownloadClick}>
          <Menu.Item.IconAndText icon={DownloadIcon} text="Download" />
        </div>

        <div onClick={showShare}>
          <Menu.Item.IconAndText icon={ShareIcon} text="Share" />
        </div>

        {displayDeleteEntryItem && (
          <div onClick={onDeleteClick}>
            <Menu.Item.IconAndText
              icon={RubbishBinIcon}
              text={`Remove from ${entry.playlist.title}`}
            />
          </div>
        )}
      </Menu.List>

      {isSaveToVisible && (
        <Modal>
          <DialogBox title="Save to..." close={closeSaveTo}>
            <SaveToPlaylist romId={entry.romId} onClose={closeSaveTo} />
          </DialogBox>
        </Modal>
      )}

      {isShareVisible && (
        <Modal>
          <DialogBox title="Share" close={closeShare}>
            <Share type="rom" id={entry.romId} />
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
