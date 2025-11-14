import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule } from 'src/clients/clients.module';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/prisma/prisma.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { CaslModule } from '../casl/casl-ability/casl.module';

@Module({
  imports: [
    ClientsModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '5m', algorithm: 'HS256' },
    }),
    CaslModule,
  ],
  providers: [AuthService, PrismaService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
