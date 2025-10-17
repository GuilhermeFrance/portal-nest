import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthRequest } from '../models/AuthRequest';
import { ClientEntity } from 'src/clients/entities/client.entity';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): ClientEntity => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.user;
  },
);
