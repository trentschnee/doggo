import { SearchLocationResponseDto } from "@/features/location/types/dtos"
import { httpClient } from "../../../lib/axios"
import { SearchLocationsParamsDto } from "../types/dtos/search-locations-params.dto"
/**
 * Search locations with optional features
 * @param params search parameters
 * @returns Promise<SearchLocationResponseDto[]>
 */
export const searchLocations = async (params: SearchLocationsParamsDto): Promise<SearchLocationResponseDto> => {

  const { data } = await httpClient.post<SearchLocationResponseDto>('/locations/search', params)
  return data
}