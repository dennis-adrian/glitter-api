import { Transform } from 'class-transformer';
import {
  IsString,
  MinLength,
  IsNotEmpty,
  IsOptional,
  IsDate,
  IsUrl,
  IsEnum,
} from 'class-validator';

enum FestivalStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export class CreateFestivalDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  startDate: Date;

  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  endDate: Date;

  @IsString()
  @IsOptional()
  location: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  locationUrl: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  logoURL: string;

  @IsEnum(FestivalStatus)
  @IsOptional()
  status: FestivalStatus;
}
