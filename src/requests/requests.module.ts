import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { RequestRepository } from './repository/type.repository';

@Module({
  controllers: [RequestsController],
  providers: [RequestsService, PrismaService, RequestRepository],
})
export class RequestsModule {}
