import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "@/lib/prismadb"
import { convertEntity } from "@/lib/convertEntity"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query

  const rom = await prisma.rom.findFirst({
    where: { id: String(id) },
  })

  if (!rom) return res.status(404)

  res.status(200).json(convertEntity.rom.toUiRom(rom))
}
