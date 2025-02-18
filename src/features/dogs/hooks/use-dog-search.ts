import { searchDogs } from "@/features/dogs/api/";
import { DOGS_QUERY_KEY } from "@/features/dogs/constants/query-keys";
import { useQuery } from "@tanstack/react-query";
import { SearchFilters } from "../types";
import { mapSearchFiltersModelToSearchParamsDto, mapSearchResponseDtoToSearchResults } from "../utils";
// todo: implement DogSearchParams
export const useDogSearch = (filters: SearchFilters) => {
  
  return useQuery({
    queryKey: [DOGS_QUERY_KEY, 'search'],
    queryFn: async () => {
      const params = mapSearchFiltersModelToSearchParamsDto(filters)
      const response = await searchDogs(params)
      return mapSearchResponseDtoToSearchResults(response)
      //
    }
  });
}