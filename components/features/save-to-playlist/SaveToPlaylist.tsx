import { useState } from "react"
import { useSession } from "next-auth/react"
import { PlusIcon } from "~/components/ui/icons"
import { PlaylistEntry } from "./PlaylistEntry"
import { CreatePlaylistForm, IFormInput } from "./CreatePlaylistForm"
import { FetchedDBQueryResult } from "~/types/utils"
import {
  type TGetUserPlaylistsParams,
  type TGetUserPlaylistsReturn,
} from "~/lib/queries/db/getUserPlaylists"
import { useFetch, useGenericMutation } from "~/lib/fetcher"
import {
  type TGetUserPlaylistsContainsRomParams,
  type TGetUserPlaylistsContainsRomReturn,
} from "~/lib/queries/db/getUserPlaylistsContainsRom"
import {
  type TCreatePlaylistEntryReturn,
  type TCreatePlaylistEntryParams,
} from "~/lib/queries/db/createPlaylistEntry"
import {
  type TCreatePlaylistParams,
  type TCreatePlaylistReturn,
} from "~/lib/queries/db/createPlaylist"

type Props = {
  romId: string
  onClose: () => void
}

export const SaveToPlaylist: React.FunctionComponent<Props> = ({
  romId,
  onClose,
}) => {
  const { data: session } = useSession()
  const [isFormOpened, setIsFormOpened] = useState(false)

  const onDialogClose = () => {
    setIsFormOpened(false)
    onClose()
  }

  const onFormOpen = () => {
    setIsFormOpened(true)
  }

  const playlistsQuery = useFetch<
    FetchedDBQueryResult<TGetUserPlaylistsReturn>,
    TGetUserPlaylistsParams
  >(
    { url: "/api/playlists" },
    { staleTime: 5 * 60 * 1000, enabled: Boolean(session?.user.id) },
  )

  const playlistsWithRomQuery = useFetch<
    FetchedDBQueryResult<TGetUserPlaylistsContainsRomReturn>,
    TGetUserPlaylistsContainsRomParams
  >(
    {
      url: "/api/playlists/contains-rom",
      search: { romId: romId, userId: session?.user.id },
    },
    {
      enabled: Boolean(session?.user.id),
    },
  )

  const createPlaylistEntryMutation = useGenericMutation<
    FetchedDBQueryResult<TCreatePlaylistEntryReturn>,
    TCreatePlaylistEntryParams
  >(
    { url: "/api/playlists/entries" },
    {
      invalidateQueries: ["/api/playlists/contains-rom"],
      onSuccess: () => {
        console.log("success!!")
        onDialogClose()
      },
    },
  )

  const createPlaylistMutation = useGenericMutation<
    FetchedDBQueryResult<TCreatePlaylistReturn>,
    TCreatePlaylistParams
  >(
    {
      url: "/api/playlists",
    },
    {
      invalidateQueries: ["/api/playlists"],
      onSuccess: (data) => {
        console.log("playlist created", data)
        createPlaylistEntryMutation.mutate({
          search: { playlistId: data?.id, romId },
          options: { method: "POST" },
        })
      },
    },
  )

  const onFormSubmit = async (data: IFormInput) => {
    createPlaylistMutation.mutate({
      options: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          type: "custom",
          isPublic: data.privacy === "public",
        }),
      },
    })
  }

  return (
    <>
      <div className="max-h-80 max-w-[600px] [&>*:not(:last-child)]:mb-4">
        {playlistsQuery.data
          ?.filter(({ type }) => type !== "history")
          ?.filter(({ authorId }) => authorId === session?.user.id)
          .map(({ title, isPublic, id }) => (
            <PlaylistEntry
              title={title}
              isPublic={isPublic}
              isChecked={Boolean(
                playlistsWithRomQuery.data?.some((pl) => pl.id === id),
              )}
              playlistId={id}
              romId={romId}
              key={id}
            />
          ))}
      </div>

      {!isFormOpened && (
        <div
          onClick={onFormOpen}
          className="c-svg-24 c-svg-w flex cursor-pointer items-center justify-center gap-2"
        >
          <PlusIcon />
          <div>Create new playlist</div>
        </div>
      )}

      {isFormOpened && <CreatePlaylistForm onSubmit={onFormSubmit} />}
    </>
  )
}
