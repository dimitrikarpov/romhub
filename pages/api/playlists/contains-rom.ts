import type { NextApiRequest, NextApiResponse } from "next"
import { unstable_getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"
import { dbQueries } from "~/lib/queries/dbQueries"
import superjson from "superjson"

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
    const { romId } = req.query

    if (!romId) return res.status(404).send("Not Found")

    const session = await unstable_getServerSession(req, res, authOptions)

    if (!session) return res.status(404).send("Not Found")

    const playlists = await dbQueries.getUserPlaylistsContainsRom({
      userId: session.user.id as string,
      romId: romId as string,
    })

    if (!playlists) return res.status(404).send("Not found")

    return res.status(200).json(superjson.stringify(playlists))
  }

  return res.status(405).end(`${req.method} Not Allowed`)
}
