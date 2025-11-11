import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
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
  @ApiProperty({ description: 'Nome do usuario' })
  firstName: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Sobrenome do usuario' })
  surname: string;
  @IsString()
  @IsNotEmpty()
  @IsCpf({ message: 'O CPF e invalido. Verifique o numero.' })
  @ApiProperty({ description: 'CPF do usuario (somente numeros)' })
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
  @ApiProperty({
    description:
      'Senha do usuario (mínimo uma letra maiúscula e um caractere especial',
  })
  password: string;

  @IsOptional()
  @ApiProperty({ description: 'Crachá do usuario (permissoes)' })
  badgesKey?: string;

  @IsInt()
  @IsOptional()
  profileImageId?: number;
}
