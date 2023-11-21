import { ReservationStatus } from '@prisma/client';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class ReservationUpdate {
  @IsNumber()
  @IsOptional()
  @IsPositive()
  standId: number;

  @IsString()
  @IsOptional()
  @IsEnum(ReservationStatus)
  status: ReservationStatus;

  @IsNumber({}, { each: true })
  @IsOptional()
  artistsIdsToAdd: number[];

  @IsNumber({}, { each: true })
  @IsOptional()
  artistsIdsToRemove: number[];
}
