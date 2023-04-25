import type { NextApiRequest, NextApiResponse } from "next"
import { dbQueries } from "~/lib/queries/dbQueries"
import superjson from "superjson"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { take } = req.query

  const roms = await dbQueries.getRandomRoms({
    take: take ? Number(take) : undefined,
  })

  res.status(200).json(superjson.stringify(roms))
}
