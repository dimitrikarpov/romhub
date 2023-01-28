import { dbQueries } from "@/lib/queries/db-queries"
import { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    const { playlistId, romId } = req.query

    if (!playlistId || !romId) return res.status(404).send("Not found")

    const result = await dbQueries.deletePlaylistEntryByRom(
      playlistId as string,
      romId as string,
    )

    if (!result) return res.status(404).send("Not found")

    return res.status(200).send("Entry deleted")
  }
}
