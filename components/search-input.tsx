'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import useDebounce from '@/hooks/useDebounce';
import { buildPathWithSearchParams } from '@/helpers/url';

export default function SearchInput() {
  const firstRender = useRef(true)
  const pathName = usePathname()
  const searchParams = useSearchParams()
  const route = useRouter()

  const search = searchParams.get('search')
  const [searchTerm, setSearchTerm] = useState(search ?? '')
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    
    const url = buildPathWithSearchParams({
      pathName, 
      searchParams, 
      searchName:'search', 
      searchValue: debouncedSearchTerm
    })    

    route.push(url)    
  }, [debouncedSearchTerm, pathName, route, searchParams])

  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Busque por nome..."
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
