import { Request } from 'express';
import { ClientEntity } from 'src/clients/entities/client.entity';

export interface AuthRequest extends Request {
  user: ClientEntity;
}
