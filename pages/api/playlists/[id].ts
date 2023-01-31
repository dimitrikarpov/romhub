import { z } from "zod"
import { dbQueries } from "@/lib/queries/dbQueries"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const { id } = req.query

    if (!id) return res.status(404).send("Not found")

    const playlist = await dbQueries.getPlaylistById(id as string)

    if (!playlist) return res.status(404).send("Not found")

    res.status(200).json(playlist)
  }

  if (req.method === "PATCH") {
    const id = req.query.id as string

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

      res.status(200).json(playlist)
    } catch (e) {
      res.status(404).send("Not found!")
    }
  }
}
