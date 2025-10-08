import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'A key não pode ser vazio' })
  key: string;
}
