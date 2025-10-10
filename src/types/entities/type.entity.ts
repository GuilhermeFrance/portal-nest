import { Type } from '@prisma/client';

export class TypeEntity implements Type {
  name: string;
  id: number;
  key: string;
  createdAt: Date;
}
