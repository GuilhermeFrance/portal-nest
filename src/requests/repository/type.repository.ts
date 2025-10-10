import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RequestEntity } from '../entities/request.entity';
import { CreateRequestDto } from '../dto/create-request.dto';
import { UpdateRequestDto } from '../dto/update-request.dto';

@Injectable()
export class RequestRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateRequestDto): Promise<RequestEntity> {
    return this.prisma.request.create({
      data,
      include: {
        type: {
          select: {
            name: true,
          },
        },
      },
    });
  }
  findAll(): Promise<RequestEntity[]> {
    return this.prisma.request.findMany();
  }

  async findOne(id: number): Promise<RequestEntity> {
    const request = await this.prisma.request.findUnique({
      where: { id },
    });
    if (!request) {
      throw new NotFoundException(`Cargo com id: ${id} não encontrado`);
    }
    return request;
  }

  update(id: number, updateRequestDto: UpdateRequestDto) {
    return this.prisma.request.update({
      where: { id },
      data: updateRequestDto,
    });
  }

  remove(id: number) {
    return this.prisma.request.delete({
      where: { id },
    });
  }
}
