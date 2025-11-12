import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repository/user.repository';
import { CaslAbilityService } from 'src/casl/casl-ability/casl-ability.service';
import type { ClientEntity } from 'src/clients/entities/client.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly repository: UserRepository,
    private readonly abilityService: CaslAbilityService,
  ) {}
  create(createUserDto: CreateUserDto, currentUser: ClientEntity) {
    const ability = this.abilityService.createForClient(currentUser);

    if (!ability.can('create', 'User')) {
      throw new UnauthorizedException(
        'Você não tem permissão para criar usuários',
      );
    }

    return this.repository.create(createUserDto);
  }

  findAll() {
    return this.repository.findAll();
  }

  async findAllPaginated(
    page: number,
    limit: number,
    filter?: string,
    roleId?: number,
  ) {
    return this.repository.findAllPaginated(page, limit, filter, roleId);
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.repository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.repository.remove(id);
  }
}
