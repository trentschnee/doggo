import { httpClient } from "../../../lib/axios"

export const logout = async () => {
  return httpClient.post('/auth/logout')
}