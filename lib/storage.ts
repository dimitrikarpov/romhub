type Bucket = "cores" | "roms"

export const createUrl = (filename: string, bucket: Bucket = "roms") => {
  return `${process.env.NEXT_PUBLIC_STORGE_URL}/${bucket}/${filename}`
}
