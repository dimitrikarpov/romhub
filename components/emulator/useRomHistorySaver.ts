import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { api } from "../../lib/api"

export const userRomHistorySaver = (romId: string) => {
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status !== "authenticated") return

    const saveToHistory = async () => {
      // TODO: replace with useQuery later
      const playlists = await api.playlists.findMany({
        userId: session.user.id as string,
      })

      const playlistId = playlists.find(({ type }) => type === "history")!.id

      await api.playlistEntries.create({ playlistId, romId })
    }

    saveToHistory()
  }, [status])
}
