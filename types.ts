const playlistTypes = ["history", "watch_later", "custom"] as const

export type TPlaylistType = typeof playlistTypes[number]

export type RomEntity = {
  name: string
  platform: string
  description?: string
  images?: string[]
  file: string
  crc32: string
  sha1: string
}

export type Rom = RomEntity & { id: string }
