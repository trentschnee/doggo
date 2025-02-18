import { httpClient } from "../../../lib/axios"
import { Dog } from "../types/models/dog"
/**
 * Gets multiple dogs by their ids
 * @param ids Array of dog ids
 * @returns 
 */
export const batchGetDogs = async (ids: string[]): Promise<Dog[]> => {
  if (ids.length === 0) {
    return []
  }
  const { data } = await httpClient.post<Dog[]>('/dogs', ids)
  return data
}