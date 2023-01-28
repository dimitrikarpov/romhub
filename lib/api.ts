import { UiRom } from "@/types/index"

type fetchRomsParams = {
  skip?: number
  take?: number
  platform?: string
  titleStartsWith?: string
}

type fetchRomsData = {
  data: UiRom[]
  total: number
  take: number
  skip: number
}

const fetchRoms = ({
  skip = 0,
  take = pageSize,
  platform = "all",
  titleStartsWith,
}: fetchRomsParams): Promise<fetchRomsData> =>
  fetch(
    "/api/roms" +
      "?" +
      new URLSearchParams({
        skip: String(skip),
        take: String(take),
        ...(platform !== "all" && {
          where: createWhereContainseQueryString("platform", platform),
        }),
        ...(titleStartsWith && {
          where: createWhereStartsWithQueryString("name", titleStartsWith),
        }),
      }),
  ).then((res) => res.json())

const pageSize = 15

const createWhereContainseQueryString = (key: string, value: string) => {
  return JSON.stringify({ [key]: { contains: value } })
}

const createWhereStartsWithQueryString = (key: string, value: string) => {
  return JSON.stringify({ [key]: { startsWith: value } })
}

export const api = {
  roms: { findMany: fetchRoms },
}
