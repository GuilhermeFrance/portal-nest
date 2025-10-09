import { User } from '@prisma/client';

export class UserEntity implements User {
  cpf: string;
  name: string;
  id: number;
  email: string;
  roleId: number | null;
  createdAt: Date;
  updatedAt: Date;
}
