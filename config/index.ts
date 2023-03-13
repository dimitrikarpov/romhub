export const playlistTypes = ["history", "watch_later", "custom"] as const

export const platforms = {
  nes: { name: "Nintendo Entertainment System", shortName: "NES" },
  md: { name: "Sega Genesis", shortName: "MEGADRIVE" },
  sfc: { name: "Super Nintendo Entertainment System", shortName: "SNES" },
} as const
