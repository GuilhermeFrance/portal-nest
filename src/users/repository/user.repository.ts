/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { delay } from 'src/utils/delay';
function generatePublicId(): string {
  const numbers = Math.floor(1000 + Math.random() * 9999);
  return `${numbers}`;
}
@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<UserEntity> {
    const publicId = generatePublicId();

    return this.prisma.user.create({
      data: { ...data, publicId },
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

  async findAllPaginated(
    page: number,
    limit: number,
    filter?: string,
    roleId?: number,
  ) {
    await delay(300);

    const skip = (page - 1) * limit;

    const where: any = {};

    if (filter && filter.trim().length > 0) {
      where.OR = [
        { name: { contains: filter.trim(), mode: 'insensitive' } },
        { publicId: { contains: filter.trim(), mode: 'insensitive' } },
        { cpf: { contains: filter.trim() } },
      ];
    }
    if (typeof roleId === 'number' && !Number.isNaN(roleId)) {
      where.roleId = roleId;
    }
    const [data, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        where,
        skip: skip,
        take: limit,

        include: {
          role: { select: { name: true } },
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    const lastPage = Math.ceil(total / limit);

    return {
      data,
      total,
      lastPage,
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
