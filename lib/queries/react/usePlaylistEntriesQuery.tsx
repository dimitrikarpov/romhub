import { useQuery } from "react-query"
import { apiQueries } from "~/lib/queries/apiQueries"
import { convertEntity } from "~/lib/convertEntity"

type initialData = Awaited<ReturnType<typeof apiQueries.getPlaylistsEntries>>

export const usePlaylistEntriesQuery = ({
  id,
  enabled = true,
  initialData,
}: {
  id?: string
  enabled?: boolean
  initialData?: initialData
}) => {
  const query = useQuery({
    queryKey: ["playlist-entries", { id }],
    queryFn: () => apiQueries.getPlaylistsEntries({ playlistId: id as string }),
    enabled: Boolean(id) && enabled,
    initialData,
    select: transformData,
  })

  return query
}

const transformData = (data: initialData) => {
  return {
    total: data.total,
    data: data.data.map((entry) => {
      return {
        ...entry,
        ...convertEntity.playlistEntry.unserializeDates(entry),
        rom: convertEntity.rom.toUiRom(entry.rom),
        playlist: convertEntity.playlist.unserializeDates(entry.playlist),
      }
    }),
  }
}
