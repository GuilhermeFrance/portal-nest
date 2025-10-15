import { ApiProperty } from '@nestjs/swagger';
import { RequestStatus } from '@prisma/client';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateRequestDto {
  @ApiProperty({ description: 'Nome da solicitação' })
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Descrição da solicitação' })
  description: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Endereço para suporte da solicitação' })
  adress: string;
  @IsEnum(RequestStatus, { message: 'Status deve ter um valor válido' })
  @IsOptional()
  @ApiProperty({
    description:
      'Estado da solicitação. Ex.: Aberto, Processando, Concluido, Rejeitado',
  })
  status?: RequestStatus;
  @IsInt()
  @IsOptional()
  @ApiProperty({
    description:
      'Serviço requerido, passado por id. Ex.: 1 - Iluminação, 2 - Limpeza',
  })
  typeId: number | null;
  @ApiProperty({
    description: 'ID do cliente caso haja',
  })
  @IsInt()
  @IsOptional()
  clientId?: number | null;
}
