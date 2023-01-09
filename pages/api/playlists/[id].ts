import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "@/lib/prismadb"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query

  const playlist = await prisma.playlist.findFirst({
    where: { id: String(id) },
  })

  if (!playlist) return res.status(404)

  res.status(200).json(playlist)
}
