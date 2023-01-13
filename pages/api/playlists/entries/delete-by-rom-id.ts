import { NextApiRequest, NextApiResponse } from "next"
import prisma from "@/lib/prismadb"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    const { playlistId, romId } = req.query

    if (!playlistId || !romId) return res.status(404).send("Not found")

    const playlist = await prisma.playlist.findUnique({
      where: { id: String(playlistId) },
    })

    if (!playlist) return res.status(404).send("Not found")

    const rom = await prisma.rom.findFirst({
      where: { id: String(romId) },
    })

    if (!rom) return res.status(404).send("Not found")

    await prisma.playlistEntry.deleteMany({
      where: {
        AND: [{ playlistId: String(playlistId) }, { romId: String(romId) }],
      },
    })

    return res.status(200).send("Entry deleted")
  }
}
