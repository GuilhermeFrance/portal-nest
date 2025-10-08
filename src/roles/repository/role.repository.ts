import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { RoleEntity } from '../entities/role.entity';

@Injectable()
export class RoleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateRoleDto): Promise<RoleEntity> {
    return this.prisma.role.create({
      data,
    });
  }

  findAll(): Promise<RoleEntity[]> {
    return this.prisma.role.findMany();
  }

  async findOne(id: number): Promise<RoleEntity> {
    const role = await this.prisma.role.findUnique({
      where: { id },
    });
    if (!role) {
      throw new NotFoundException(`Cargo com id: ${id} não encontrado`);
    }
    return role;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.prisma.role.update({
      where: { id },
      data: updateRoleDto,
    });
  }

  remove(id: number) {
    return this.prisma.role.delete({
      where: { id },
    });
  }
}
