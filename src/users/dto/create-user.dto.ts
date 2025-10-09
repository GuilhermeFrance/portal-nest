import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsCpf } from 'src/common/validators/is-cpf.validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  email: string;

  @IsNotEmpty({ message: 'O CPF e obrigatorio' })
  @IsCpf({ message: 'O CPF e invalido. Verifique o numero.' })
  cpf: string;

  @IsOptional()
  @IsInt()
  roleId: number;
}
