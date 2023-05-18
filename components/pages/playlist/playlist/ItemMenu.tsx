import {
  ClockIcon,
  DownloadIcon,
  ListPlusIcon,
  MoreVerticalIcon,
  Share2Icon,
  Trash2Icon,
} from "lucide-react"
import { Session } from "next-auth"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { InfiniteData, useQueryClient } from "react-query"
import { SaveToPlaylist } from "~/components/features/save-to-playlist/SaveToPlaylist"
import { Share } from "~/components/features/share/Share"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog/dialog"
import { IconButton } from "~/components/ui/icon-button/IconButton"
import { Menu } from "~/components/ui/menu/Menu"
import { downloadRom } from "~/lib/downloadRom"
import { useGenericMutation } from "~/lib/fetcher"
import { type DeletePlaylistEntryByRom } from "~/lib/queries/db/deletePlaylistEntryByRom"
import { UiPlaylistEntry } from "~/types/index"
import { useAddToWatchLaterMutation } from "./useAddToWatchLaterMutation"
import { GetPlaylistsEntries } from "~/lib/queries/db/getPlaylistsEntries"

type Props = {
  entry: UiPlaylistEntry
}

export const ItemMenu: React.FunctionComponent<Props> = ({ entry }) => {
  const queryClient = useQueryClient()

  const { data: session } = useSession()
  const displaySaveToDialog = canSaveRomToOwnPlaylist(session)
  const displayDeleteEntryItem = canDeletePlaylistEntryById(session, entry)

  const [visibleShare, setVisibleShare] = useState(false)
  const [visibleSaveTo, setVisibleSaveTo] = useState(false)

  const addToWatchLaterMutation = useAddToWatchLaterMutation(entry.romId)

  const deleteEntryMutation = useGenericMutation<DeletePlaylistEntryByRom>(
    {
      url: "/api/playlists/entries/delete-by-rom-id",
      options: { method: "DELETE" },
    },
    {
      invalidateQueries: [["/api/playlists/contains-rom"]],
      onSuccess: (data) => {
        queryClient.setQueryData<
          InfiniteData<GetPlaylistsEntries["data"]> | undefined
        >(
          ["/api/playlists/entries", { playlistId: entry.playlistId }],
          (oldData) => {
            if (!oldData) return oldData
            const newPages = oldData?.pages.map((page) => ({
              ...page,
              data: page.data.filter(
                (originEntry) => originEntry.id !== entry.id,
              ),
            }))
            newPages[0].total = newPages[0].total
              ? newPages[0].total - 1
              : undefined
            return { ...oldData, pages: newPages }
          },
        )
      },
    },
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
        <IconButton>
          <MoreVerticalIcon />
        </IconButton>
      </Menu.Handler>
      <Menu.List position="left">
        {session && (
          <div onClick={onSaveToWatchLaterClick}>
            <Menu.Item.IconAndText
              icon={ClockIcon}
              text="Save to Watch Later"
            />
          </div>
        )}

        {displaySaveToDialog && (
          <div
            onClick={() => {
              setVisibleSaveTo(true)
            }}
          >
            <Menu.Item.IconAndText
              icon={ListPlusIcon}
              text="Save to playlist"
            />
          </div>
        )}

        <div onClick={onDownloadClick}>
          <Menu.Item.IconAndText icon={DownloadIcon} text="Download" />
        </div>

        <div
          onClick={() => {
            setVisibleShare(true)
          }}
        >
          <Menu.Item.IconAndText icon={Share2Icon} text="Share" />
        </div>

        {displayDeleteEntryItem && (
          <div onClick={onDeleteClick}>
            <Menu.Item.IconAndText
              icon={Trash2Icon}
              text={`Remove from ${entry.playlist.title}`}
            />
          </div>
        )}
      </Menu.List>

      <Dialog open={visibleSaveTo} onOpenChange={setVisibleSaveTo}>
        <DialogContent className="w-fit max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Save to...</DialogTitle>
          </DialogHeader>

          <SaveToPlaylist
            romId={entry.romId}
            onClose={() => {
              setVisibleSaveTo(false)
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={visibleShare} onOpenChange={setVisibleShare}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share</DialogTitle>
          </DialogHeader>
          <Share type="rom" id={entry.romId} />
        </DialogContent>
      </Dialog>
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
