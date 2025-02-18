import { httpClient } from "../../../lib/axios"
import { Dog } from "../types/dog"

export const getDogs = async (ids: string[]): Promise<Dog[]> => {
  if (ids.length === 0) {
    return []

  }
  const { data } = await httpClient.get<Dog[]>('/dogs', {
    params: {
      ids
    }
  })
  return data
}