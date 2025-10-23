import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';

import { PrismaService } from 'src/prisma/prisma.service';
import { ClientPayload } from '../models/ClientPayload';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly JwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly AbilityService: CaslAbilityService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers['authorization']?.split(' ')[1];

    if (!token) {
      throw new NotFoundException('No token provided');
    }
    try {
      const payload = this.JwtService.verify<ClientPayload>(token, {
        algorithms: ['HS256'],
      });
      const user = await this.prisma.client.findUnique({
        where: { email: payload.email },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      request.user = user;
      this.AbilityService.createForClient(user);
      return true;
    } catch (e) {
      console.error(e);
      throw new NotFoundException('Invalid token', { cause: e });
    }
  }
}
