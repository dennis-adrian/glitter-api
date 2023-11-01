import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateProgramDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  readonly date?: Date;

  @IsUrl()
  readonly address_url?: string;
}
