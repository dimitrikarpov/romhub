import { useSession } from "next-auth/react"
import { useFetch, useGenericMutation } from "~/lib/fetcher"
import { type GetUserPlaylists } from "~/lib/queries/db/getUserPlaylists"
import { type CreatePlaylistEntry } from "~/lib/queries/db/createPlaylistEntry"

export const useSaveToHistory = () => {
  const { data: session } = useSession()

  const playlistQuery = useFetch<GetUserPlaylists>(
    { url: "/api/playlists" },
    { staleTime: 5 * 60 * 1000, enabled: Boolean(session?.user.id) },
  )

  const addMutation = useGenericMutation<CreatePlaylistEntry>(
    { url: "/api/playlists/entries", options: { method: "POST" } },
    {
      invalidateQueries: ["/api/playlists/contains-rom"],
    },
  )

  const saveRomToHistory = async (romId: string) => {
    if (!session?.user?.id || !playlistQuery.data) return

    const historyPlaylist = playlistQuery.data.find(
      ({ type }) => type === "history",
    )

    addMutation.mutate({
      search: { playlistId: historyPlaylist!.id, romId },
    })
  }

  return saveRomToHistory
}
