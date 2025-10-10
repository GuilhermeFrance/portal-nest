import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateRequestDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsString()
  @IsNotEmpty()
  adress: string;
  @IsInt()
  @IsNotEmpty()
  typeId: number | null;
  @IsInt()
  @IsNotEmpty()
  clientId: number | null;
}
