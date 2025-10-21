import { RequestStatus } from '@prisma/client';

export class StatusEntity implements RequestStatus {
  id: number;
  key: string;
  name: string;
}
