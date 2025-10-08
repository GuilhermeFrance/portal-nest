import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  email: string;

  @IsOptional()
  @IsInt()
  roleId: number;
}
