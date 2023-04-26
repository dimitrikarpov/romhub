import { NextApiRequest, NextApiResponse } from "next"
import { dbQueries } from "~/lib/queries/dbQueries"
import superjson from "superjson"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { playlistId, skip, take } = req.query

    if (!playlistId) return res.status(404).send("Not found")

    const found = await dbQueries.getPlaylistsEntries({
      playlistId: playlistId as string,
    })

    if (!found) return res.status(404).send("Not found")

    return res.status(200).json(superjson.stringify(found))
  }

  if (req.method === "DELETE") {
    //
  }

  if (req.method === "POST") {
    const { playlistId, romId } = req.query

    console.log("on backend!!", playlistId, romId)

    if (!playlistId || !romId) return res.status(404).send("Not found")

    const result = await dbQueries.createPlaylistEntry({
      playlistId: playlistId as string,
      romId: romId as string,
    })

    if (!result) return res.status(404).send("Not found")

    return res.status(200).json({ result: "Entry has been added" })
  }
}
