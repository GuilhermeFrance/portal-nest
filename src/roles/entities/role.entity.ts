import { Role } from '@prisma/client';

export class RoleEntity implements Role {
  name: string;
  id: number;
  key: string;
  updatedAt: Date;
}
