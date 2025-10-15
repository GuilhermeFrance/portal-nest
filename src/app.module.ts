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

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot(),
    RolesModule,
    ClientsModule,
    TypesModule,
    RequestsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, UserRepository, RoleRepository],
})
export class AppModule {}
