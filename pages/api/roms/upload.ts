import { NextApiRequest, NextApiResponse } from "next"
import formidable, { IncomingForm } from "formidable"
import short from "short-uuid"
import { calculateCRC32, calculateSHA1 } from "../../../lib/hashes"

var mv = require("mv")

type FormFields = formidable.Fields
type FormFiles = Partial<{
  rom: formidable.File
  images: formidable.File[]
}>

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST")
    res.status(405).json({
      data: null,
      error: "Method Not Allowed",
    })
    return
  }

  const data = await new Promise<{
    fields: FormFields
    files: FormFiles
  }>((resolve, reject) => {
    const form = new IncomingForm()

    const fields: any = {}

    const files: FormFiles = {
      images: [],
    }

    form.on("field", (name, value) => {
      fields[name] = value
    })
    form.on("file", (name, file) => {
      if (name === "images") {
        files.images!.push(file)
      }
      if (name === "rom") {
        files.rom = file
      }
    })

    form.parse(req, (err) => {
      if (err) return reject(err)
      return resolve({ files, fields })
    })
  })

  // const rom = data.files

  const rom_uid = short.generate()

  const entryData = {
    title: data.fields.title,
    description: data.fields.description,
    crc32: calculateCRC32(data!.files!.rom!.filepath),
    sha1: calculateSHA1(data!.files!.rom!.filepath),
  }

  console.log(data)

  res.status(200).json({ message: "cool", data, entryData })

  // * copy files
  // * make json
  // * write to db
}

// console.log(fields, files)
// console.log(files.file?.filepath)
// var oldPath = files.file.filepath
// var newPath = `./public/uploads/${files.file.originalFilename}`
// mv(oldPath, newPath)
// res.status(200).json({ fields, files })

// res.status(200).json({ message: "cool", fields, files })
