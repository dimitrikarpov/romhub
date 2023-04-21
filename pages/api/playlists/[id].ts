import type { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"
import { unstable_getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"
import { dbQueries } from "~/lib/queries/dbQueries"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const id = req.query.id as string
  if (!id) return res.status(404).send("Not found")

  if (req.method === "GET") {
    const playlist = await dbQueries.getPlaylistById(id)

    if (!playlist) return res.status(404).send("Not found")

    return res.status(200).json(playlist)
  }

  // TODO: check [permissions]
  if (req.method === "PATCH") {
    const schema = z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      isPublic: z.boolean().optional(),
    })

    try {
      const { title, description, isPublic } = schema.parse(req.body)

      const playlist = await dbQueries.patchPlaylist({
        id,
        title,
        description,
        isPublic,
      })

      return res.status(200).json(playlist)
    } catch (e) {
      return res.status(404).send("Not found!")
    }
  }

  if (req.method === "DELETE") {
    const session = await unstable_getServerSession(req, res, authOptions)

    if (!session) return res.status(404).send("Not Found")

    const result = await dbQueries.deletePlaylist(id, session)

    if (!result) return res.status(404).send("Not Found")

    return res.status(200).send("deleted")
  }

  return res.status(405).end(`${req.method} Not Allowed`)
}
