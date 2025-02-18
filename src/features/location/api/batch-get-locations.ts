import { LocationDto } from "@/features/location/types/dtos"
import { httpClient } from "../../../lib/axios"
/**
 * Gets location data for multiple zip codes
 * @param ids Array of dog ids
 * @returns Promise<LocationDto[]>
 */
export const batchGetLocations = async (zipCodes: string[]): Promise<LocationDto[]> => {
  if (zipCodes.length === 0) {
    return []
  }
  // The body of the request would be an array of no more than 100 zip codes
  if (zipCodes.length > 100) {
    throw new Error('Maximum of 100 zip codes allowed')
  }
  const { data } = await httpClient.post<LocationDto[]>('/locations', zipCodes)
  return data
}