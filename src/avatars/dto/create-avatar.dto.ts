import { IsOptional, IsString } from 'class-validator';

export class CreateAvatarDto {
  @IsString()
  @IsOptional()
  name?: string;
}
