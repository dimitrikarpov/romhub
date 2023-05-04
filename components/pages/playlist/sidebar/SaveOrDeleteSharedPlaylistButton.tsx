import { IconButton } from "~/components/ui/icon-button/IconButton"
import { ListPlusIcon, ListXIcon } from "lucide-react"
import { Playlist, User } from "@prisma/client"
import { useSession } from "next-auth/react"
import { useFetch, useGenericMutation } from "~/lib/fetcher"
import { type GetUserPlaylists } from "~/lib/queries/db/getUserPlaylists"

type Props = {
  playlist: Playlist & { author: User }
}

export const SaveOrDeleteSharedPlaylistButton: React.FunctionComponent<
  Props
> = ({ playlist }) => {
  const { data: session } = useSession()

  const { data: playlists } = useFetch<GetUserPlaylists>({
    url: "/api/playlists",
  })

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
        <IconButton tip="Save playlist" onClick={addToLibrary}>
          <ListPlusIcon />
        </IconButton>
      )}
      {isRemoveButtonVisible && (
        <IconButton tip="Remove from Library" onClick={deleteFromLibrary}>
          <ListXIcon />
        </IconButton>
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
