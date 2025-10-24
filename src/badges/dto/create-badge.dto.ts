import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBadgeDto {
  @ApiProperty({ description: 'Nome do crachá' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Chave do crachá' })
  @IsString()
  @IsNotEmpty()
  key: string;
}
