import { filename } from "./filename"

/**
 *  Trying to find some tags in rom's filename
 *
 * For example:
 * `some great retro game (Japan) (USA).nes` will extract tags 'nes', 'Japan', 'USA'
 * @param name rom filename includes extension
 * @returns array of tags
 */
export const extractTagsFromRomName = (name: string) => {
  const regexp = /\(([^)]+)\)/g

  const extension = filename.getExtension(name)

  const tags = Array.from(name.matchAll(regexp))
    .map((matches) => matches[1])
    .reduce(
      (acc: string[], tag: string) => [
        ...acc,
        ...tag.split(",").map((part) => part.trim()),
      ],
      [],
    )
    .map((tag) => (tag.startsWith("Proto") ? "Proto" : tag))
    .filter((tag) => !tag.startsWith("Rev"))
    .filter((tag) => !tag.match(/^v\d/))
    .filter((tag) => !tag.match(/^\d+/))
    .filter((tag) => tag !== "Unknown")

  return [extension, ...tags]
}
