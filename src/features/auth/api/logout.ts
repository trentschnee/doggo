import { httpClient } from "../../../lib/axios"

export const logout = async () => {
  await httpClient.post('/auth/logout')
}