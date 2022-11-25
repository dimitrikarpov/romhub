import path from "path"
import { copyFile, readdir, readFile } from "node:fs/promises"
import { PrismaClient } from "@prisma/client"
import { Rom } from "../types"

// function pause(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms))
// }

const prisma = new PrismaClient()

// type Meta = {
//   title: string
//   tags: string[]
//   images: string[]
//   file: string
//   crc32: string
//   sha1: string
// }

async function main() {
  try {
    const inDir = path.join(__dirname, "in")
    const outDir = path.join(__dirname, "..", "roms")

    const files = await readdir(inDir)

    files
      .filter(
        // get only meta json file to parse
        (fileName) => path.extname(path.join(inDir, fileName)) === ".json",
      )
      .forEach(async (fileName) => {
        const infoData = await readFile(path.join(inDir, fileName), {
          encoding: "utf8",
        })
        const meta: Rom = JSON.parse(infoData)

        // console.log({ meta })

        // await pause(100)

        /* copying rom file */
        await copyFile(
          path.join(inDir, meta.file),
          path.join(outDir, meta.file),
        )

        // await pause(100)

        /* copying images of rom */
        meta.images?.forEach(async (file) => {
          await copyFile(path.join(inDir, file), path.join(outDir, file))
        })

        /* add rom meta to db */
        await prisma.rom.upsert({
          where: {
            sha1: meta.sha1,
          },
          update: {},
          create: {
            title: meta.title,
            file: meta.file,
            crc32: meta.crc32,
            sha1: meta.sha1,
            tags: JSON.stringify(meta.tags),
            ...(meta.images && { images: JSON.stringify(meta.images) }),
          },
        })

        /* add tags */
        meta.tags?.forEach(async (name) => {
          await prisma.tag.upsert({
            where: { name },
            update: {},
            create: {
              name,
            },
          })
        })
      })
  } catch (err) {
    console.error(err)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
