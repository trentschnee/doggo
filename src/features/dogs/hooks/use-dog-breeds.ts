import { getBreeds } from "@/features/dogs/api/get-breeds";
import { DOGS_QUERY_KEY } from "@/features/dogs/constants/query-keys";
import { useQuery } from "@tanstack/react-query";

export const useDogBreeds = () => {
  return useQuery({
    queryKey: [DOGS_QUERY_KEY, 'breeds'],
    queryFn: getBreeds
  });
}