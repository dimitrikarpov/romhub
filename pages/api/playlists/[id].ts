import { dbQueries } from "@/lib/data-queries/db-queries"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const { id } = req.query

    if (!id) return res.status(404).send("Not found")

    const playlist = await dbQueries.fetchPlaylistById(id as string)

    if (!playlist) return res.status(404).send("Not found")

    res.status(200).json(playlist)
  }
}
