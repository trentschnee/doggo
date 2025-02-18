import { GeoBoundingBoxDto } from "./geo-bounding-box-dto";

export interface SearchLocationsParamsDto {
  city?: string,
  states?: string[],
  geoBoundingBox?: GeoBoundingBoxDto,
  size?: number,
  from?: number
}