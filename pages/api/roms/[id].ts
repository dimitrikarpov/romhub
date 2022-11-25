import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../../prisma/db"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query

  const rom = await prisma.rom.findFirst({
    where: { id: String(id) },
  })

  res.status(200).json(rom)
}
