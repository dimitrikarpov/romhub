import type { NextApiRequest, NextApiResponse } from "next"
import { unstable_getServerSession } from "next-auth"
import { TCreatePlaylistFormData } from "~/types/index"
import { authOptions } from "../auth/[...nextauth]"
import superjson from "superjson"
import { getUserPlaylists } from "~/lib/queries/db/getUserPlaylists"
import { createPlaylist } from "~/lib/queries/db/createPlaylist"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const session = await unstable_getServerSession(req, res, authOptions)
    if (!session) return res.status(404).send("Not Found")

    const playlists = await getUserPlaylists({
      userId: session.user.id as string,
    })

    return res.status(200).json(superjson.stringify(playlists))
  }

  if (req.method === "POST") {
    const session = await unstable_getServerSession(req, res, authOptions)

    if (!session) return res.status(404).send("Not Found")

    const body = req.body as TCreatePlaylistFormData

    const playlist = await createPlaylist({
      authorId: session.user.id as string,
      data: body,
    })

    return res.status(200).json(superjson.stringify(playlist))
  }

  return res.status(405).end(`${req.method} Not Allowed`)
}
