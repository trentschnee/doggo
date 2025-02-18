/**
 * SearchParamsDto
 * @description Data transfer object for search params
 */
export interface SearchParamsDto {
  breeds?: string[]
  zipCodes?: string[],
  ageMin?: number,
  ageMax?: number,
  //additional query params
  size?: number,
  from?: string,
  sort?: string

}