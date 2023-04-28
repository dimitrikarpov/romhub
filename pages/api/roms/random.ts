import type { NextApiRequest, NextApiResponse } from "next"
import superjson from "superjson"
import { getRandomRoms } from "~/lib/queries/db/getRandomRoms"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { take } = req.query

  const roms = await getRandomRoms({
    take: take ? Number(take) : undefined,
  })

  res.status(200).json(superjson.stringify(roms))
}
