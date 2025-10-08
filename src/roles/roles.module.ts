import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { RoleRepository } from './repository/role.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [RolesController],
  providers: [RolesService, RoleRepository, PrismaService],
})
export class RolesModule {}
