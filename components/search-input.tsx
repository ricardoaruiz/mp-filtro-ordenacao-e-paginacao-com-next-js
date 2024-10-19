'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { buildPathWithSearchParams } from '@/helpers/url';
import useDebounceFunction from '@/hooks/useDebounceFunction';

export default function SearchInput() {
  const pathName = usePathname()
  const searchParams = useSearchParams()
  const route = useRouter()

  const search = (searchParams.get('search') ?? '').toLowerCase()
  const page = searchParams.get('page') ?? '1'

  const [searchTerm, setSearchTerm] = useState(search)  

  useDebounceFunction(() => {
    const isSearchChanged = searchTerm !== search
    const url = buildPathWithSearchParams({
      pathName, 
      searchParams, 
      search: [
        { name:'search', value: searchTerm},
        { name:'page', value: isSearchChanged ? '1' : page}
      ]
    })    

    route.push(url)    
  }, 300)

  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Busque por nome..."
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
      />
    </div>
  );
}
