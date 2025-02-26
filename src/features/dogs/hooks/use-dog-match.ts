import { useMutation } from "@tanstack/react-query"
import { matchDogs } from "../api"

export const useMatchDogs = ({ onMatchSuccess }: { onMatchSuccess?: (matchId: string) => void }) => {
  return useMutation({
    mutationFn: matchDogs, onSuccess: (matchId) => {
      if (matchId && onMatchSuccess) {
        onMatchSuccess(matchId)
      }
    }
  })

}