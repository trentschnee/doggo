import { httpClient } from "../../../lib/axios"
/**
 * 
 * @param ids Array of dog ids to generate a match from
 * @returns 
 */
export const matchDogs = async (ids: string[]) => {
  if (ids.length === 0) {
    return ""
  }
  const { data } = await httpClient.post<{ match: string }>('/dogs/match', ids)
  return data.match
}