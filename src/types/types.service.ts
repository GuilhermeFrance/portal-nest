import { Injectable } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { TypeRepository } from './repository/type.repository';

@Injectable()
export class TypesService {
  constructor(private readonly repository: TypeRepository) {}
  create(createTypeDto: CreateTypeDto) {
    return this.repository.create(createTypeDto);
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  update(id: number, updateTypeDto: UpdateTypeDto) {
    return this.repository.update(id, updateTypeDto);
  }

  remove(id: number) {
    return this.repository.remove(id);
  }
}
