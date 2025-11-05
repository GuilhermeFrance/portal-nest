import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsCpf } from 'src/common/validators/is-cpf.validator';

export class CreateUserDto {
  @ApiProperty({ description: 'O nome do funcionário' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'O email do funcionário' })
  @IsString()
  email: string;

  @ApiProperty({
    description:
      'Informe o CPF do funcionário, deve ser válido e não deve conter ´.´ ou ´-´',
  })
  @IsNotEmpty({ message: 'O CPF e obrigatorio' })
  @IsCpf({ message: 'O CPF e invalido. Verifique o numero.' })
  cpf: string;

  @ApiProperty({ description: 'O cargo do funcionário (id)' })
  @IsOptional()
  @IsInt()
  roleId: number;

  @IsOptional()
  @IsString()
  publicId?: string | null;
}
