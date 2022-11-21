import React, { ChangeEvent, SyntheticEvent, useState } from "react"
import { filename } from "../lib/filename"

export default function Upload() {
  const [rom, setRom] = useState<File>()
  const [images, setImages] = useState<FileList>()
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")

  const onRomChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const rom = e.target.files[0]
    const title = filename.getFilename(rom.name)

    setRom(rom)
    setTitle(title)
  }

  const onImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    setImages(e.target.files)
  }

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const onDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
  }

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()

    const formData: any = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    formData.append("rom", rom)
    if (images) {
      Array.from(images).forEach((image) => {
        formData.append("images", image)
      })
    }

    const response = await fetch("/api/storage/upload", {
      method: "POST",
      body: formData,
    })

    const body = (await response.json()) as {
      status: "ok" | "fail"
      message: string
    }

    console.log("body", body)
  }

  return (
    <form>
      <input type="file" name="rom" onChange={onRomChange} />
      <input type="file" name="images" multiple onChange={onImagesChange} />
      <input
        type="text"
        name="title"
        placeholder="title"
        value={title}
        onChange={onTitleChange}
      />

      <textarea
        name="description"
        value={description}
        onChange={onDescription}
      ></textarea>
      <input type="submit" onClick={onSubmit} />
    </form>
  )
}

/*
{
  title: "Bishoujo Senshi Sailor Moon (Japan)",
  tags: ["sfc", "Japan"],
  images: [
    "1AH2UrS5zrNdV7QXYJpUGz-snap.png",
    "1AH2UrS5zrNdV7QXYJpUGz-title.png",
  ],
  file: "1AH2UrS5zrNdV7QXYJpUGz.sfc",
  crc32: "a56323c1",
  sha1: "330844563db7d208d57bc2bb95c7fbc0a830eff5",
}
*/
