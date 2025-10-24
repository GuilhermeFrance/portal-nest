import { Request } from '@prisma/client';

export class RequestEntity implements Request {
  statusKey: string | null;
  id: number;
  name: string;
  description: string;
  adress: string;
  typeId: number;
  clientId: number | null;
  createdAt: Date;
  updatedAt: Date;
}
