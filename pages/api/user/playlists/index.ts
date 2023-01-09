import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "@/lib/prismadb"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { userId } = req.query

  if (!userId) return res.status(404)

  const playlists = await prisma.playlist.findMany({
    where: { userId: String(userId) },
  })

  if (!playlists) return res.status(404)

  res.status(200).json(playlists)
}
