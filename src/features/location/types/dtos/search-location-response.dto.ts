import { LocationDto } from "./location.dto";

export interface SearchLocationResponseDto { 
  total: number,
  results: LocationDto[],
}
