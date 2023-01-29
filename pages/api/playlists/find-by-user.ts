import { dbQueries } from "@/lib/queries/dbQueries"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const { userId } = req.query

    if (!userId) return res.status(404).send("Not found")

    const playlists = await dbQueries.findUserPlaylists(userId as string)

    if (!playlists) return res.status(404).send("Not found")

    res.status(200).json(playlists)
  }
}
