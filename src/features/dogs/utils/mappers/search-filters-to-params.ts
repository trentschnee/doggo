import { SearchFilters, SearchParamsDto } from "@/features/dogs/types";

export const mapSearchFiltersModelToSearchParamsDto = (filters: SearchFilters): SearchParamsDto => {
  // destructure different properties from filters for proper mapping
  const { age, cursor, pageSize, sortBy, sortOrder, breeds, zipCodes } = filters;

  return {
    breeds,
    zipCodes,
    ageMin: age?.min,
    ageMax: age?.max,
    size: pageSize,
    from: cursor,
    sort: sortBy ? `${sortBy}:${sortOrder}` : undefined
  };
}