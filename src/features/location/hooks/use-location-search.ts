import { useQuery } from "@tanstack/react-query"
import { searchLocations } from "../api"
import { LOCATIONS_QUERY_KEY } from "../constants/query-keys"
import { SearchLocationsParamsDto } from "../types/dtos/search-locations-params.dto"

export const useLocationsSearch = (params: SearchLocationsParamsDto) => {
  return useQuery({ queryKey: [LOCATIONS_QUERY_KEY, 'search', params], queryFn: () => searchLocations(params) })
}