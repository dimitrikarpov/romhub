import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../../prisma/db"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const playlists = await prisma.playlist.findMany()

  res.status(200).json(playlists)
}
