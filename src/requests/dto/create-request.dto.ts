import { ApiProperty } from '@nestjs/swagger';

import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
}
