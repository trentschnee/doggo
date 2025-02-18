import { httpClient } from "../../../lib/axios"

export const getBreeds = async (): Promise<string[]> => {
  const { data } = await httpClient.get<string[]>('/dogs/breeds')
  return data
}