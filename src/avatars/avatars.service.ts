import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AvatarsService {
  constructor(private readonly prisma: PrismaService) {}
  create(data: {
    name: string;
    mimetype: string;
    size: number;
    data: Buffer | Uint8Array;
  }) {
    return this.prisma.image.create({
      data: {
        name: data.name,
        mimetype: data.mimetype,
        size: data.size,
        data:
          data.data instanceof Buffer ? new Uint8Array(data.data) : data.data,
      },
    });
  }

  findAll() {
    return this.prisma.image.findMany();
  }

  findOne(id: number) {
    return this.prisma.image.findUnique({
      where: { id },
    });
  }

  async assignToClient(clientId: number, avatarId: number) {
    return this.prisma.client.update({
      where: { id: clientId },
      data: { profileImage: { connect: { id: avatarId } } },
    });
  }
}
