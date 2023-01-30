import { dbQueries } from "@/lib/queries/dbQueries"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { skip, take, where } = req.query

  try {
    const { total, data } = await dbQueries.getRoms({
      ...(skip && { skip: Number(skip) }),
      ...(take && { take: Number(take) }),
      ...(where && { where: JSON.parse(where as string) }),
    })

    res.status(200).json({ total, take, skip, data })
  } catch (e) {
    res.status(404).send("Not found!")
  }
}
