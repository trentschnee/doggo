import { CoordinatesDto } from "./coordinates-dto";

export interface GeoBoundingBoxDto {
  top?: CoordinatesDto,
  left?: CoordinatesDto,
  bottom?: CoordinatesDto,
  right?: CoordinatesDto,
  bottom_left?: CoordinatesDto;
  top_right?: CoordinatesDto;
  bottom_right?: CoordinatesDto;
  top_left?: CoordinatesDto;
}