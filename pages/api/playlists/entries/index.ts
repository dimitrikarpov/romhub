import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../../../prisma/db"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { playlistId } = req.query

    if (!playlistId) return res.status(404).send("Not found")

    const found = await prisma.playlist.findFirst({
      where: { id: String(playlistId) },
      include: {
        entries: {
          include: {
            rom: true,
          },
        },
      },
    })

    if (!found) return res.status(404).send("Not found")

    return res.status(200).json(found.entries)
  }

  if (req.method === "DELETE") {
    //
  }

  if (req.method === "POST") {
    const { playlistId, romId } = req.query

    if (!playlistId || !romId) return res.status(404).send("Not found")

    console.log({ playlistId, romId })

    const playlist = await prisma.playlist.findUnique({
      where: { id: String(playlistId) },
    })

    if (!playlist) return res.status(404).send("Not found")

    const rom = await prisma.rom.findFirst({ where: { id: String(romId) } })

    if (!rom) return res.status(404).send("Not found")

    await prisma.playlist.update({
      where: {
        id: String(playlistId),
      },
      include: {
        entries: true,
      },
      data: {
        entries: {
          create: { romId: String(romId) },
          //   create: [{ rom, romId: String(romId) }],

          //   create: [{ playlistId: String(playlistId), romId: String(romId) }],
        },
      },
    })

    // const result = await prisma.playlistEntry.create({
    //   data: { romId: String(romId), playlistId: String(playlistId) },
    // })

    // console.log({ result })

    return res.status(200).send("Entry has been added")
  }
}
