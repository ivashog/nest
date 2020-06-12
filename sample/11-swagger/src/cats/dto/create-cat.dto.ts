import { IsInt, IsString, IsPositive, MaxLength, Max, Min } from 'class-validator';

export class CreateCatDto {
  @MaxLength(50)
  @IsString()
  readonly name: string;

  @Max(30)
  @Min(0)
  @IsInt()
  readonly age: number;

  @MaxLength(50)
  @IsString()
  readonly breed: string;
}
