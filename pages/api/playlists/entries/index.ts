import { NextApiRequest, NextApiResponse } from "next"
import { dbQueries } from "@/lib/queries/dbQueries"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { playlistId, skip, take } = req.query

    if (!playlistId) return res.status(404).send("Not found")

    const found = await dbQueries.getPlaylistsEntries({
      playlistId: playlistId as string,
    })

    if (!found) return res.status(404).send("Not found")

    return res.status(200).json(found)
  }

  if (req.method === "DELETE") {
    //
  }

  if (req.method === "POST") {
    const { playlistId, romId } = req.query

    if (!playlistId || !romId) return res.status(404).send("Not found")

    const result = await dbQueries.createPlaylistEntry(
      playlistId as string,
      romId as string,
    )

    if (!result) return res.status(404).send("Not found")

    return res.status(200).send("Entry has been added")
  }
}
