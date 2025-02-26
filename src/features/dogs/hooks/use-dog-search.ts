import { searchDogs } from "@/features/dogs/api/";
import { DOGS_QUERY_KEY } from "@/features/dogs/constants/query-keys";
import { useQuery } from "@tanstack/react-query";
import { SearchFilters } from "../types";
import { mapSearchFiltersModelToSearchParamsDto, mapSearchResponseDtoToSearchResults } from "../utils";
export const useDogSearch = (filters: SearchFilters, enabled: boolean = true) => {
  return useQuery({
    queryKey: [DOGS_QUERY_KEY, 'search', filters],
    queryFn: async () => {
      const params = mapSearchFiltersModelToSearchParamsDto(filters)
      const response = await searchDogs(params)
      return mapSearchResponseDtoToSearchResults(response)
    },
    enabled: enabled,
  });
}