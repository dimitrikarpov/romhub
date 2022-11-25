export const createUrl = (filename: string) => {
  return `${process.env.HOST}/api/storage/${filename}`
}
