import type { NextApiRequest, NextApiResponse } from "next"
import { dbQueries } from "@/lib/queries/dbQueries"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const { skip, take, where } = req.query

    try {
      const { total, data } = await dbQueries.getRoms({
        ...(skip && { skip: Number(skip) }),
        ...(take && { take: Number(take) }),
        ...(where && { where: JSON.parse(where as string) }),
      })

      return res.status(200).json({ total, take, skip, data })
    } catch (e) {
      return res.status(404).send("Not found!")
    }
  }

  res.status(405).end(`${req.method} Not Allowed`)
}

// TODO: looks like place for crfs token
