// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient()

type Data = {
  // name?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  // if (req.method === "POST") {
  //   const contactsData = JSON.parse(req.body)

  //   const savedContact = await prisma.contact.create({ data: contactsData })

  //   res.json(savedContact)
  // }

  res.status(200).json({ name: "John Doe" })
}
