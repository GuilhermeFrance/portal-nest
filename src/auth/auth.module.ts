import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule } from 'src/clients/clients.module';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/prisma/prisma.service';
@Module({
  imports: [ClientsModule, PassportModule],
  providers: [AuthService, PrismaService],
  controllers: [AuthController],
})
export class AuthModule {}
