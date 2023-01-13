import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "@/lib/prismadb"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const playlists = await prisma.playlist.findMany()

    res.status(200).json(playlists)
  }

  if (req.method === "POST") {
    //
  }
}
