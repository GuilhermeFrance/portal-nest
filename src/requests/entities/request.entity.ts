import { $Enums, Request } from '@prisma/client';

export class RequestEntity implements Request {
  id: number;
  name: string;
  description: string;
  adress: string;
  typeId: number | null;
  clientId: number | null;
  status: $Enums.RequestStatus;
  createdAt: Date;
  updatedAt: Date;
}
