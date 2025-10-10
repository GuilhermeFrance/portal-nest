import { Module } from '@nestjs/common';
import { TypesService } from './types.service';
import { TypesController } from './types.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { TypeRepository } from './repository/type.repository';

@Module({
  controllers: [TypesController],
  providers: [TypesService, PrismaService, TypeRepository],
})
export class TypesModule {}
