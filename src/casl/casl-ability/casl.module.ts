import { Global, Module } from '@nestjs/common';
import { CaslAbilityService } from './casl-ability.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { ClientsService } from 'src/clients/clients.service';
import { ClientRepository } from 'src/clients/repository/client.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Global()
@Module({
  providers: [
    CaslAbilityService,
    AuthService,
    JwtService,
    ClientsService,
    ClientRepository,
    PrismaService,
  ],
  exports: [CaslAbilityService],
})
export class CaslModule {}
