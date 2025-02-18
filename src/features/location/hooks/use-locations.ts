import { useQuery } from "@tanstack/react-query"
import { batchGetLocations } from "../api"
import { LOCATIONS_QUERY_KEY } from "../constants/query-keys"

export const useLocations = (zipCodes: string[]) => {
  return useQuery({ queryKey: [LOCATIONS_QUERY_KEY, 'batch', zipCodes], queryFn: () => batchGetLocations(zipCodes) })
}