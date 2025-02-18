import { httpClient } from "../../../lib/axios";
import { SearchParamsDto } from "../types/dtos/search-params.dto";
import { SearchResponseDto } from "../types/dtos/search-response.dto";
/**
 * Search for dogs with the given filters
 * @param filters 
 */
export const searchDogs = async (params: SearchParamsDto): Promise<SearchResponseDto> => {
  //TODO: implement
  const { data } = await httpClient.get<SearchResponseDto>('/dogs/search', { params })
  return data;
}