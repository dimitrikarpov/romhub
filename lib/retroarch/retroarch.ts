import { Retroarch } from "holy-retroarch"

let retroarch: Retroarch

// type RParams = ConstructorParameters<typeof Retroarch>

// type A = {
//   [K in RParams[number]]: any
// }

type GetRetroarchParams = ConstructorParameters<typeof Retroarch> | never

export const getRetroarch = (...params: GetRetroarchParams) => {
  if (!retroarch) {
    if (!params[0] || !params[1]) return
    retroarch = new Retroarch(...params)
    retroarch.init()
  }

  return retroarch
}

// export const createRetroarch = (
//   params: ConstructorParameters<typeof Retroarch>,
// ) => {
//   retroarch = new Retroarch(...params)
// }

// export const getRetroarch = () => {
//   if (!retroarch) {
//     throw new Error(
//       "[holy-retoarch]: retoarch not create. Use `createRetroarch()` before",
//     )
//   }

//   return retroarch
// }
