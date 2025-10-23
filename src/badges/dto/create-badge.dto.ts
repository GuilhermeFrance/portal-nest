import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBadgeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  key: string;
}
