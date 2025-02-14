import { httpClient } from "@/lib/axios"
import { LoginDTO } from "../types/login-dto"
/**
 * An auth cookie, fetch-access-token will be included. This will expire in 1 hour.
 * @returns Promise<void>
 * @param name 
 * @param email 
 */
export const login = async ({ name, email }: LoginDTO): Promise<void> => {
  return httpClient.post('/auth/login', { name, email })
}