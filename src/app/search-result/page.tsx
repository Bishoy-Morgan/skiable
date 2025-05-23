// app/search-result/page.tsx
'use client'

import { Suspense } from 'react'
import SearchResult from './SearchResults'

export default function SearchResultPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xl">Loading...</div>}>
      <SearchResult />
    </Suspense>
  )
}
