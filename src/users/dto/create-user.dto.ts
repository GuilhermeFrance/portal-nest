import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { IsCpf } from 'src/common/validators/is-cpf.validator';
import { MinNonWhiteSpaceLength } from 'src/common/validators/nonspacelength.validator';

export class CreateUserDto {
  @ApiProperty({ description: 'O nome do funcionário' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Insira um nome válido' })
  name: string;

  @ApiProperty({ description: 'O email do funcionário' })
  @IsString()
  @MinLength(15, { message: 'Insira um email válido' })
  email: string;

  @ApiProperty({
    description:
      'Informe o CPF do funcionário, deve ser válido e não deve conter ´.´ ou ´-´',
  })
  @IsNotEmpty({ message: 'O CPF e obrigatorio' })
  @IsCpf({ message: 'O CPF é invalido. Verifique o numero.' })
  cpf: string;

  @ApiProperty({ description: 'O cargo do funcionário (id)' })
  @IsOptional()
  @IsInt()
  roleId: number;

  @IsOptional()
  @IsString()
  publicId?: string | null;
}
