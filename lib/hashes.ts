import fs from "fs"
import crc32 from "crc/crc32"
import cryptoLib from "crypto"

export const calculateCRC32 = (filepath: string) => {
  return crc32(fs.readFileSync(filepath)).toString(16)
}

export const calculateSHA1 = (filepath: string) => {
  const hashSum = cryptoLib.createHash("sha1")
  const fileBuffer = fs.readFileSync(filepath)
  hashSum.update(fileBuffer)

  return hashSum.digest("hex")
}
