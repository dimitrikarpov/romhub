import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "@/lib/prismadb"
import { TCreatePlaylistFormData } from "@/types/index"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const playlists = await prisma.playlist.findMany()

    res.status(200).json(playlists)
  }

  if (req.method === "POST") {
    const body = req.body as TCreatePlaylistFormData

    const playlist = await prisma.playlist.create({
      data: body,
    })

    res.status(200).json(playlist)
  }
}
