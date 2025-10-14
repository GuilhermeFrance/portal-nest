import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { delay } from 'src/utils/delay';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateUserDto): Promise<UserEntity> {
    return this.prisma.user.create({
      data,
      include: {
        role: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async findAll(): Promise<UserEntity[]> {
    return this.prisma.user.findMany({
      include: {
        role: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async findAllPaginated(page: number, limit: number) {
    await delay(300);
    const skip = (page - 1) * limit;

    // Usa $transaction para garantir que a contagem e a busca ocorram juntas
    const [data, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        skip: skip,
        take: limit,
        // Inclua relacionamentos necessários aqui (ex: role)
        include: {
          role: { select: { name: true } },
        },
      }),
      this.prisma.user.count(),
    ]);

    const lastPage = Math.ceil(total / limit);

    // Retorna o objeto paginado
    return {
      data, // A lista de usuários na página atual
      total, // O número total de usuários
      lastPage, // O número total de páginas
      currentPage: page,
    };
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
