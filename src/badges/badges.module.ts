import { Module } from '@nestjs/common';
import { BadgesService } from './badges.service';
import { BadgesController } from './badges.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { BadgesRepository } from './repository/badges.repository';

@Module({
  controllers: [BadgesController],
  providers: [BadgesService, PrismaService, BadgesRepository],
})
export class BadgesModule {}
