import { SearchResponseDto, SearchResults } from "@/features/dogs/types";

export const mapSearchResponseDtoToSearchResults = (responseDto: SearchResponseDto): SearchResults => {
  // Destructure different properties from response for proper mapping
  const { resultIds, total, next, prev } = responseDto;


  let nextCursor: string | undefined = undefined;
  let previousCursor: string | undefined = undefined;

  if (next) {
    const nextMatch = next.match(/from=([^&]+)/);
    if (nextMatch && nextMatch[1]) {
      nextCursor = nextMatch[1];
    }
  }

  if (prev) {
    const prevMatch = prev.match(/from=([^&]+)/);
    if (prevMatch && prevMatch[1]) {
      previousCursor = prevMatch[1];
    }
  }

  return {
    dogIds: resultIds,
    totalCount: total,
    hasNextPage: !!next,
    hasPreviousPage: !!prev,
    nextCursor,
    previousCursor
  };
};