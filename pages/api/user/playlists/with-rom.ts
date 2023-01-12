import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "@/lib/prismadb"

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
  const { userId, romId } = req.query

  if (!userId || !romId) return res.status(404).send("Not found")

  const playlists = await prisma.playlist.findMany({
    where: {
      AND: [
        { entries: { some: { romId: String(romId) } } },
        { userId: String(userId) },
      ],
      NOT: [{ type: "history" }],
    },
  })

  if (!playlists) return res.status(404).send("Not found")

  res.status(200).json(playlists)
}
