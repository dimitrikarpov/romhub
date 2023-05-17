import { NextApiRequest, NextApiResponse } from "next"
import superjson from "superjson"
import { getPlaylistEntriesInfinite } from "~/lib/queries/db/getPlaylistEntriesInfinite"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { playlistId, cursor, orderBy } = req.query

    if (!playlistId) return res.status(404).send("Not found")

    const found = await getPlaylistEntriesInfinite({
      playlistId: playlistId as string,
      cursor: cursor as string,
    })

    if (!found) return res.status(404).send("Not found")

    return res.status(200).json(superjson.stringify(found))
  }
}
