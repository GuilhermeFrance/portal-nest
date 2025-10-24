import { Client } from '@prisma/client';

export class ClientEntity implements Client {
  badgesKey: string | null;
  id: number;
  name: string;
  email: string;
  password: string;
  cpf: string;
  createdAt: Date;
}
