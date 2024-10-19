import { ReadonlyURLSearchParams } from "next/navigation";

type BuildPathWithSearchParams = {
  pathName: string
  searchParams: ReadonlyURLSearchParams
  searchName: string
  searchValue: string
}

export const buildPathWithSearchParams = ({ pathName, searchParams, searchName, searchValue }: BuildPathWithSearchParams) => {
  const params = new URLSearchParams(searchParams)

  searchValue === ''
    ? params.delete(searchName)
    : params.set(searchName, searchValue.toLowerCase())

  return `${pathName}?${params.toString()}`
}