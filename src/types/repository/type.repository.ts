import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTypeDto } from '../dto/create-type.dto';
import { TypeEntity } from '../entities/type.entity';
import { UpdateTypeDto } from '../dto/update-type.dto';

@Injectable()
export class TypeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateTypeDto): Promise<TypeEntity> {
    return this.prisma.type.create({
      data,
    });
  }
  findAll(): Promise<TypeEntity[]> {
    return this.prisma.type.findMany();
  }

  async findOne(id: number): Promise<TypeEntity> {
    const type = await this.prisma.type.findUnique({
      where: { id },
    });
    if (!type) {
      throw new NotFoundException(`Cargo com id: ${id} não encontrado`);
    }
    return type;
  }

  update(id: number, updateTypeDto: UpdateTypeDto) {
    return this.prisma.type.update({
      where: { id },
      data: updateTypeDto,
    });
  }

  remove(id: number) {
    return this.prisma.type.delete({
      where: { id },
    });
  }
}
