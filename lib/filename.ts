export const filename = {
  getFilename: (name: string) => name.split(".").slice(0, -1).join("."),
  getExtension: (name: string) => name.split(".").slice(-1)[0],
}
