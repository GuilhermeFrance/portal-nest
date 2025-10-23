import { Global, Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClientRepository } from './repository/client.repository';
import { JwtService } from '@nestjs/jwt';

@Global()
@Module({
  controllers: [ClientsController],
  providers: [ClientsService, PrismaService, ClientRepository, JwtService],
  exports: [ClientsService],
})
export class ClientsModule {}
