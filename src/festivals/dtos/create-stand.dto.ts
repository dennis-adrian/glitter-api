import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';

class Connect {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  id: number;
}

class Festival {
  @ValidateNested()
  @Type(() => Connect)
  connect: Connect;
}

export class CreateStandDto {
  @IsString()
  @IsOptional()
  label: string;

  @IsNumber()
  @IsNotEmpty()
  standNumber: number;

  @IsString()
  @IsOptional()
  @MinLength(5)
  description: string;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsObject()
  @ValidateNested()
  @Type(() => Festival)
  festival: {
    connect: {
      id: number;
    };
  };
}
