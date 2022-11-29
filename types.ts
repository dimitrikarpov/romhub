export type RomEntity = {
  title: string
  description?: string
  tags?: string[]
  images?: string[]
  file: string
  crc32: string
  sha1: string
}

export type Rom = RomEntity & { id: string }
