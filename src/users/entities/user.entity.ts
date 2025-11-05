import { User } from '@prisma/client';

export class UserEntity implements User {
  publicId: string | null;
  cpf: string;
  name: string;
  id: number;
  email: string;
  roleId: number | null;
  createdAt: Date;
  updatedAt: Date;
}
