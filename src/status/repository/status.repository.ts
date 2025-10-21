import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStatusDto } from '../dto/create-status.dto';
import { UpdateStatusDto } from '../dto/update-status.dto';
import { StatusEntity } from '../entities/status.entity';

@Injectable()
export class StatusRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateStatusDto): Promise<StatusEntity> {
    return this.prisma.requestStatus.create({
      data,
    });
  }

  async findAll(): Promise<StatusEntity[]> {
    return this.prisma.requestStatus.findMany();
  }

  async findOne(id: number): Promise<StatusEntity> {
    const status = await this.prisma.requestStatus.findUnique({
      where: { id },
    });
    if (!status) {
      throw new NotFoundException('Status not found');
    }
    return status;
  }

  async update(id: number, data: UpdateStatusDto): Promise<StatusEntity> {
    const status = await this.prisma.requestStatus.update({
      where: { id },
      data,
    });
    if (!status) {
      throw new NotFoundException('Status not found');
    }
    return status;
  }

  async remove(id: number) {
    const status = await this.prisma.requestStatus.delete({ where: { id } });
    if (!status) {
      throw new NotFoundException('Status not found');
    }
  }
}
