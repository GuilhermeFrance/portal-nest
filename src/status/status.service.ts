import { Injectable } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { StatusRepository } from './repository/status.repository';

@Injectable()
export class StatusService {
  constructor(private readonly repository: StatusRepository) {}
  create(data: CreateStatusDto) {
    return this.repository.create(data);
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  update(id: number, data: UpdateStatusDto) {
    return this.repository.update(id, data);
  }

  remove(id: number) {
    return this.repository.remove(id);
  }
}
