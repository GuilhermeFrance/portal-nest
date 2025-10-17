import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClientEntity } from '../entities/client.entity';
import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ClientRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createClientDto: CreateClientDto): Promise<ClientEntity> {
    const passwordHash: string = await bcrypt.hash(
      createClientDto.password,
      10,
    );

    const data = {
      name: createClientDto.name,
      email: createClientDto.email,
      cpf: createClientDto.cpf,
      password: passwordHash,
    };

    const created = await this.prisma.client.create({
      data,
      select: {
        id: true,
        name: true,
        email: true,
        cpf: true,
        createdAt: true,
      },
    });

    return created as unknown as ClientEntity;
  }

  findAll(): Promise<ClientEntity[]> {
    return this.prisma.client.findMany();
  }

  async findbyEmail(email: string): Promise<ClientEntity> {
    const client = await this.prisma.client.findUnique({
      where: { email },
    });
    if (!client) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return client as unknown as ClientEntity;
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
