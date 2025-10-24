import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsCpf } from 'src/common/validators/is-cpf.validator';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  @IsCpf({ message: 'O CPF e invalido. Verifique o numero.' })
  cpf: string;
  @IsString()
  @IsNotEmpty()
  email: string;

  @MinLength(8, { message: 'senha muito curta, no minimo 8 caracteres' })
  @MaxLength(20, { message: 'senha muito longa, no maximo 15 caracteres' })
  @IsString()
  @IsNotEmpty()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.[a-z]).*$/, {
    message: 'senha muito fraca',
  })
  password: string;

  @IsOptional()
  badgesKey?: string;
}
