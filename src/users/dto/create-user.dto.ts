import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  @MinLength(3)
  firstName: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  displayName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  firebaseId: string;
}
