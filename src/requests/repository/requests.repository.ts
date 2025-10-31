import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RequestEntity } from '../entities/request.entity';
import { CreateRequestDto } from '../dto/create-request.dto';
import { UpdateRequestDto } from '../dto/update-request.dto';
import { delay } from 'src/utils/delay';

@Injectable()
export class RequestRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateRequestDto): Promise<RequestEntity> {
    return this.prisma.request.create({
      data,
      include: {
        type: true,
        status: true,
      },
    });
  }
  findAll(): Promise<RequestEntity[]> {
    return this.prisma.request.findMany();
  }
  async findAllPaginated(page: number, limit: number) {
    await delay(300);
    const skip = (page - 1) * limit;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.request.findMany({
        skip: skip,
        take: limit,
        include: {
          type: true,
          status: {
            select: {
              name: true,
            },
          },
        },
      }),
      this.prisma.request.count(),
    ]);

    const lastPage = Math.ceil(total / limit);

    return {
      data,
      total,
      lastPage,
      currentPage: page,
    };
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

  async update(id: number, updateRequestDto: UpdateRequestDto) {
    // 1. Verificar se o statusKey existe (se foi passado)
    if (updateRequestDto.statusKey) {
      const statusExists = await this.prisma.requestStatus.findUnique({
        where: { key: updateRequestDto.statusKey },
      });

      if (!statusExists) {
        throw new NotFoundException(
          `Status '${updateRequestDto.statusKey}' não encontrado`,
        );
      }
    }

    // 2. Atualizar e incluir relacionamentos
    return this.prisma.request.update({
      where: { id },
      data: updateRequestDto,
      include: {
        type: true,
        status: true,
        Client: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.request.delete({
      where: { id },
    });
  }
}
