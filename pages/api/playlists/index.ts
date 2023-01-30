import type { NextApiRequest, NextApiResponse } from "next"
import { TCreatePlaylistFormData } from "@/types/index"
import { dbQueries } from "@/lib/queries/dbQueries"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const { userId } = req.query

    const playlists = await dbQueries.getUserPlaylists(userId as string)

    res.status(200).json(playlists)
  }

  if (req.method === "POST") {
    const body = req.body as TCreatePlaylistFormData

    const playlist = await dbQueries.createPlaylist(body)

    res.status(200).json(playlist)
  }
}
