import { SearchResponseDto, SearchResults } from "@/features/dogs/types";

export const mapSearchResponseDtoToSearchResults = (responseDto: SearchResponseDto): SearchResults => {
  // destructure different properties from filters for proper mapping
  const { resultIds, total, next, prev, } = responseDto
  return ({
    dogIds: resultIds,
    totalCount: total,
    hasNextPage: !!next,
    hasPreviousPage: !!prev,
    nextCursor: next,
    previousCursor: prev
  })
}