import { Prisma, Rom } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
import { createUrl } from "../../../lib/storage"
import prisma from "@/lib/prismadb"

const transformRomImages = (
  images: string | null | undefined,
): string[] | undefined => {
  return images
    ? JSON.parse(images).map((image: string) => createUrl(image, "roms"))
    : undefined
}

const transfromFile = (file: string): string => {
  return createUrl(file, "roms")
}

export const transformRom = (rom: Rom) => {
  const file = transfromFile(rom.file)
  const images = transformRomImages(rom.images)

  return { ...rom, file, ...(images && { images }) }
}

const parseWheres = (
  whereString: string | string[] | undefined,
): Prisma.RomWhereInput | undefined => {
  if (!whereString) return undefined

  const wheresStringsArray = Array.isArray(whereString)
    ? whereString
    : [whereString]

  const result = wheresStringsArray.reduce((acc: any[], condString: string) => {
    try {
      const json = JSON.parse(condString)
      return [...acc, json]
    } catch (e) {
      return acc
    }
  }, [])

  if (!result.length) return undefined

  return { AND: result }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { skip = 0, take = 15, where } = req.query

  const wheres = parseWheres(where)

  try {
    const total = await prisma.rom.count({ ...(wheres && { where: wheres }) })
    const roms = await prisma.rom.findMany({
      ...(wheres && { where: wheres }),
      skip: Number(skip),
      take: Number(take),
    })

    res.status(200).json({ total, take, skip, data: roms.map(transformRom) })
  } catch (e) {
    res.status(404).send("Not found!")
  }
}
