import { Client } from '@prisma/client';

export class ClientEntity implements Client {
  id: number;
  name: string;
  email: string;
  password: string;
  cpf: string;
  createdAt: Date;
}
