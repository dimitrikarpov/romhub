import type { NextApiRequest, NextApiResponse } from "next"
import superjson from "superjson"
import { getRoms } from "~/lib/queries/db/getRoms"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const { skip, take, where, cursor, orderBy } = req.query

    try {
      const found = await getRoms({
        ...(skip && { skip: Number(skip) }),
        ...(take && { take: Number(take) }),
        ...(typeof cursor === "string" && { cursor: cursor as string }),
        ...(where && { where: JSON.parse(where as string) }),
        ...(orderBy && { orderBy: JSON.parse(orderBy as string) }),
      })

      return res.status(200).json(superjson.stringify(found))
    } catch (e) {
      return res.status(404).send("Not found!")
    }
  }

  res.status(405).end(`${req.method} Not Allowed`)
}
