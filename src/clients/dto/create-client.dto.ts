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
// import { IsEmailUnique } from 'src/common/validators/unique-email.validator';

export class CreateClientDto {
  @IsString({ message: 'name must be a string' })
  @IsNotEmpty()
  @ApiProperty({ description: 'Nome do usuario' })
  @Matches(/(?!.*\d)[\p{L}\s'-]+$/u, {
    message: 'Nome e sobrenome só podem conter letras.',
  })
  firstName: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Sobrenome do usuario' })
  @Matches(/(?!.*\d)[\p{L}\s'-]+$/u, {
    message: 'Nome e sobrenome só podem conter letras.',
  })
  surname: string;
  @IsString()
  @IsNotEmpty()
  @IsCpf({ message: 'O CPF e invalido. Verifique o numero.' })
  @ApiProperty({ description: 'CPF do usuario (somente numeros)' })
  cpf: string;
  @IsString()
  @IsNotEmpty()
  // @IsEmailUnique({ message: 'Email em uso' })
  email: string;

  @MinLength(8, { message: 'senha muito curta, no minimo 8 caracteres' })
  @MaxLength(20, { message: 'senha muito longa, no maximo 15 caracteres' })
  @IsString()
  @IsNotEmpty()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.[a-z]).*$/, {
    message: 'Senha muito fraca!',
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
