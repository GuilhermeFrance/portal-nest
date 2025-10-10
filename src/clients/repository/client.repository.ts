import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClientEntity } from '../entities/client.entity';
import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';

@Injectable()
export class ClientRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateClientDto): Promise<ClientEntity> {
    return this.prisma.client.create({
      data,
    });
  }

  findAll(): Promise<ClientEntity[]> {
    return this.prisma.client.findMany();
  }

  async findOne(id: number) {
    const client = await this.prisma.client.findUnique({
      where: { id },
    });
    if (!client) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }
    return client;
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    const client = await this.prisma.client.update({
      where: { id },
      data: updateClientDto,
    });
    if (!client) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }
  }

  async remove(id: number) {
    const client = await this.prisma.client.delete({
      where: { id },
    });
    if (!client) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }
  }
}
