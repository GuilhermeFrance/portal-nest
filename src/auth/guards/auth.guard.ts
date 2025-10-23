import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly JwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers['authorization']?.split(' ')[1];

    if (!token) {
      throw new NotFoundException('No token provided');
    }
    try {
      const payload = this.JwtService.verify<{
        email: string;
        password: string;
      }>(token, { algorithms: ['HS256'] });
      const user = await this.prisma.client.findUnique({
        where: { email: payload.email },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      request.user = user;
      return true;
    } catch (e) {
      console.error(e);
      throw new NotFoundException('Invalid token', { cause: e });
    }
  }
}
