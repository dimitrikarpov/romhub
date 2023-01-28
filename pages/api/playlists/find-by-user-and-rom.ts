import { apiQueries } from "@/lib/data-queries/api-queries"
import { dbQueries } from "@/lib/data-queries/db-queries"
import type { NextApiRequest, NextApiResponse } from "next"

/**
 * Find user playlists that contains specific rom
 *
 * @param req userId: string romId: string
 * @param res
 * @returns playlists
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const { userId, romId } = req.query

    if (!userId || !romId) return res.status(404).send("Not found")

    const playlists = await dbQueries.findPlaylistByUserAndRom(
      userId as string,
      romId as string,
    )

    if (!playlists) return res.status(404).send("Not found")

    res.status(200).json(playlists)
  }
}
