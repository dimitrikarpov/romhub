import type { NextApiRequest, NextApiResponse } from "next"
import { dbQueries } from "~/lib/queries/dbQueries"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { limit } = req.query

  const roms = await dbQueries.getRandomRoms(limit ? Number(limit) : undefined)

  res.status(200).json(roms)
}
