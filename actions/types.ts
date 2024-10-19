// API Request
export type APIRequest<TFilter, TOrder> = {
  filter?: TFilter;
  order?: APISort<TOrder>;
  page?: number;
}

type APISort<T> = {
  field: T;
  direction: 'asc' | 'desc';
}


// API Response
export type APIResponse<T> = {
  data: T;
  links: Links
  meta: Meta
}

type Links = {
  first: string;
  last: string;
  next: string | null;
  prev: string | null;
}

export type MetaLink = {
  url: string | null;
  label: string;
  active: boolean;
}

type Meta = {
  current_page: number;
  from: number | null;
  last_page: number;
  links: MetaLink[]
  path: string;
  per_page: number;
  to: number | null;
  total: number;
}