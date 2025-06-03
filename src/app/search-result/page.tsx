'use client'

import { Suspense } from 'react'
import SearchResult from './components/SearchResults'

export default function SearchResultPage() {
  return (
    <main>
      <Suspense>
        <SearchResult />
      </Suspense>
    </main>
  )
}
