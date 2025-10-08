import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleRepository } from './repository/role.repository';
import { RoleEntity } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(private readonly repository: RoleRepository) {}
  create(createRoleDto: CreateRoleDto): Promise<RoleEntity> {
    return this.repository.create(createRoleDto);
  }

  findAll(): Promise<RoleEntity[]> {
    return this.repository.findAll();
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.repository.update(id, updateRoleDto);
  }

  remove(id: number) {
    return this.repository.remove(id);
  }
}
