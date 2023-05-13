import { Retroarch } from "holy-retroarch"

let retroarch: Retroarch

export const getRetroarch = () => {
  if (!retroarch) {
    retroarch = new Retroarch()
  }

  return retroarch
}
