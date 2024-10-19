import { ReadonlyURLSearchParams } from "next/navigation";

type Search = {
  name: string;
  value: string;
}

type BuildPathWithSearchParams = {
  pathName: string
  searchParams: ReadonlyURLSearchParams
  search: Search[]
}

export const buildPathWithSearchParams = ({ pathName, searchParams, search }: BuildPathWithSearchParams) => {
  const params = new URLSearchParams(searchParams)

  search.forEach(({ name, value }) => {
    value === ''
      ? params.delete(name)
      : params.set(name, value.toLowerCase())
  })


  return `${pathName}?${params.toString()}`
}