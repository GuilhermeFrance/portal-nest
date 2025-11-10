import { Client } from '@prisma/client';

export class ClientEntity implements Client {
  profileImageId: number | null;
  imageId: number | null;
  firstName: string;
  surname: string;
  badgesKey: string | null;
  id: number;
  email: string;
  password: string;
  cpf: string;
  createdAt: Date;
}
