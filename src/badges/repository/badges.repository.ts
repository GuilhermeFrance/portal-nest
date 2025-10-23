import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBadgeDto } from '../dto/create-badge.dto';
import { UpdateBadgeDto } from '../dto/update-badge.dto';
import { BadgeEntity } from '../entities/badge.entity';

@Injectable()
export class BadgesRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateBadgeDto): Promise<BadgeEntity> {
    return this.prisma.badge.create({ data });
  }

  findAll(): Promise<BadgeEntity[]> {
    return this.prisma.badge.findMany();
  }

  async findOne(id: number): Promise<BadgeEntity> {
    const badge = await this.prisma.badge.findUnique({
      where: { id },
    });
    if (!badge) {
      throw new NotFoundException('Badge not found');
    }
    return badge;
  }

  async update(id: number, data: UpdateBadgeDto): Promise<BadgeEntity> {
    const badge = await this.prisma.badge.update({
      where: { id },
      data,
    });
    if (!badge) {
      throw new NotFoundException('Badge not found');
    }
    return badge;
  }
  async remove(id: number) {
    const badge = await this.prisma.badge.delete({
      where: { id },
    });
    if (!badge) {
      throw new NotFoundException('Badge not found');
    }
    return badge;
  }
}
