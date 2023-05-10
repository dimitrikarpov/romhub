import { NextApiRequest, NextApiResponse } from "next"
import superjson from "superjson"
import { createPlaylistEntry } from "~/lib/queries/db/createPlaylistEntry"
import { getPlaylistsEntries } from "~/lib/queries/db/getPlaylistsEntries"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { playlistId, skip, take, orderBy } = req.query

    if (!playlistId) return res.status(404).send("Not found")

    const found = await getPlaylistsEntries({
      playlistId: playlistId as string,
      ...(skip && { skip: Number(skip) }),
      ...(take && { take: Number(take) }),
      ...(orderBy && { orderBy: JSON.parse(orderBy as string) }),
    })

    if (!found) return res.status(404).send("Not found")

    return res.status(200).json(superjson.stringify(found))
  }

  if (req.method === "DELETE") {
    //
  }

  if (req.method === "POST") {
    const { playlistId, romId } = req.query

    if (!playlistId || !romId) return res.status(404).send("Not found")

    const result = await createPlaylistEntry({
      playlistId: playlistId as string,
      romId: romId as string,
    })

    if (!result) return res.status(404).send("Not found")

    return res.status(200).json({ result: "Entry has been added" })
  }
}
