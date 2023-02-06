import type { NextApiRequest, NextApiResponse } from "next"
import { unstable_getServerSession } from "next-auth"
import { TCreatePlaylistFormData } from "@/types/index"
import { dbQueries } from "@/lib/queries/dbQueries"
import { authOptions } from "../auth/[...nextauth]"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const session = await unstable_getServerSession(req, res, authOptions)

    if (!session) return res.status(404).send("Not Found")

    const playlists = await dbQueries.getUserPlaylists(
      session.user.id as string,
    )

    return res.status(200).json(playlists)
  }

  if (req.method === "POST") {
    const session = await unstable_getServerSession(req, res, authOptions)

    if (!session) return res.status(404).send("Not Found")

    const body = req.body as TCreatePlaylistFormData

    const playlist = await dbQueries.createPlaylist(
      session.user.id as string,
      body,
    )

    return res.status(200).json(playlist)
  }

  return res.status(405).end(`${req.method} Not Allowed`)
}
