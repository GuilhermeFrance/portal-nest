import { ApiProperty } from '@nestjs/swagger';

import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { MinNonWhiteSpaceLength } from 'src/common/validators/nonspacelength.validator';

export class CreateRequestDto {
  @ApiProperty({ description: 'Nome da solicitação' })
  @IsString()
  @IsNotEmpty()
  @MinLength(10, { message: 'Insira um nome mais detalhado' })
  @MinNonWhiteSpaceLength(10, {
    message: 'Insira um nome mais detalhado (sem contar os espaços)',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Descrição da solicitação' })
  @MinLength(20, { message: 'Insira uma descrição mais detalhada' })
  @MinNonWhiteSpaceLength(10, {
    message: 'Insira uma descrição mais detalhado (sem contar os espaços)',
  })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Endereço para suporte da solicitação' })
  @MinLength(20, { message: 'Insira um endereço mais preciso' })
  @MinNonWhiteSpaceLength(10, {
    message: 'Insira um endereço mais detalhado (sem contar os espaços)',
  })
  adress: string;

  @IsOptional()
  @ApiProperty({
    description:
      'Estado da solicitação. Ex.: Aberto, Processando, Concluido, Rejeitado',
  })
  @IsInt()
  @ApiProperty({
    description:
      'Serviço requerido, passado por id. Ex.: 1 - Iluminação, 2 - Limpeza',
  })
  typeId: number;

  @ApiProperty({
    description: 'ID do cliente caso haja',
  })
  @IsInt()
  @IsOptional()
  clientId?: number | null;

  @IsString()
  @IsOptional()
  statusKey?: string;
}
