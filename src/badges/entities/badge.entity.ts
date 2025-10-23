import { Badge } from "@prisma/client";

export class BadgeEntity implements Badge {
  name: string;
  id: number;
  key: string;
  createdAt: Date;
}
