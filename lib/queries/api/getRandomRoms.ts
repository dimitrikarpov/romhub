import { UiRom } from "~/types/index"

export const getRandomRoms = (): Promise<UiRom[]> => {
  return fetch("/api/roms/random").then((res) => res.json())
}
