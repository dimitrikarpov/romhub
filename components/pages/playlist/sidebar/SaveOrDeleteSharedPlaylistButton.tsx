import { IconButton } from "~/components/ui/icon-button/IconButton"
import {
  PlaylistWithDoneMarkIcon,
  AddToPlaylistIcon,
} from "~/components/ui/icons"
import { Playlist, User } from "@prisma/client"
import { useSession } from "next-auth/react"
import { useFetch, useGenericMutation } from "~/lib/fetcher"
import { FetchedDBQueryResult } from "~/types/utils"
import {
  type TGetUserPlaylistsParams,
  type TGetUserPlaylistsReturn,
} from "~/lib/queries/db/getUserPlaylists"

type Props = {
  playlist: Playlist & { author: User }
}

export const SaveOrDeleteSharedPlaylistButton: React.FunctionComponent<
  Props
> = ({ playlist }) => {
  const { data: session } = useSession()

  const { data: playlists } = useFetch<
    FetchedDBQueryResult<TGetUserPlaylistsReturn>,
    TGetUserPlaylistsParams
  >({ url: "/api/playlists" })

  const addMutation = useGenericMutation(
    {
      url: `/api/playlists/library/${playlist.id}`,
      options: { method: "POST" },
    },
    { invalidateQueries: ["/api/playlists"] },
  )

  const deleteMutation = useGenericMutation(
    {
      url: `/api/playlists/library/${playlist.id}`,
      options: { method: "DELETE" },
    },
    { invalidateQueries: ["/api/playlists"] },
  )

  const isUserAlreadySavedThisPlaylist = playlists?.some(
    ({ id }) => playlist.id === id,
  )
  const isSaveButtonVisible =
    caSaveSharedPlaylist(playlist) && !isUserAlreadySavedThisPlaylist
  const isRemoveButtonVisible =
    canRemoveSharedPlaylistFromLibrary() && isUserAlreadySavedThisPlaylist

  const addToLibrary = () => {
    addMutation.mutate({})
  }

  const deleteFromLibrary = () => {
    deleteMutation.mutate({})
  }

  if (!session || playlist.authorId === session.user.id) return null

  return (
    <>
      {isSaveButtonVisible && (
        <IconButton
          icon={AddToPlaylistIcon}
          tip="Save playlist"
          onClick={addToLibrary}
        />
      )}
      {isRemoveButtonVisible && (
        <IconButton
          icon={PlaylistWithDoneMarkIcon}
          tip="Remove from Library"
          onClick={deleteFromLibrary}
        />
      )}
    </>
  )
}

// TODO: [permisson]
const caSaveSharedPlaylist = (playlist: Playlist) => {
  return playlist.isPublic && playlist.type === "custom" // TODO: maybe check if current user is not author
}

// TODO: [permisson]
const canRemoveSharedPlaylistFromLibrary = () => true // TODO: maybe check if current user is not author
