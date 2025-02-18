export interface SearchResponseDto {
  resultIds: string[],
  total: number,
  next?: string,
  prev?: string
}