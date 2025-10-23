import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { UserRepository } from './users/repository/user.repository';
import { RolesModule } from './roles/roles.module';
import { RoleRepository } from './roles/repository/role.repository';
import { ClientsModule } from './clients/clients.module';
import { TypesModule } from './types/types.module';
import { RequestsModule } from './requests/requests.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { StatusModule } from './status/status.module';
import { BadgesModule } from './badges/badges.module';
import { CaslAbilityService } from './casl/casl-ability/casl-ability.service';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RolesModule,
    ClientsModule,
    TypesModule,
    RequestsModule,
    AuthModule,
    StatusModule,
    BadgesModule,
    JwtModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    UserRepository,
    RoleRepository,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    CaslAbilityService,
    AuthService,
  ],
})
export class AppModule {}
