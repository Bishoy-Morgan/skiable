'use client'

import { Suspense } from 'react'
import SearchResult from './components/SearchResults'
import FlightSearch from '@/src/components/FlightSearch'

export default function SearchResultPage() {
  return (
    <main>
      <div className='w-[90%] 2xl:w-4/5 rounded-xl max-w-7xl mx-auto mt-[10%] bg-[#F5F3ED] '>
        <FlightSearch />
      </div>
      <Suspense>
        <SearchResult />
      </Suspense>
    </main>
  )
}
