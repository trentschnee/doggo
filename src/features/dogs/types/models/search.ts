// the client-side search filter options
export interface SearchFilters {
  breeds?: string[]
  zipCodes?: string[],
  age?: {
    min?: number
    max?: number
  }
  sortBy?: 'breed' | 'age' | 'name'
  sortOrder?: 'asc' | 'desc'
  pageSize?: number
  cursor?: string
}
// client side search results
export interface SearchResults {
  dogIds: string[],
  totalCount: number,
  hasNextPage: boolean,
  hasPreviousPage: boolean,
  nextCursor?: string,
  previousCursor?: string
}