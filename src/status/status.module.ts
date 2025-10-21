import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusController } from './status.controller';
import { StatusRepository } from './repository/status.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [StatusController],
  providers: [StatusService, PrismaService, StatusRepository],
})
export class StatusModule {}
