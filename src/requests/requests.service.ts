import { Injectable } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { RequestRepository } from './repository/type.repository';

@Injectable()
export class RequestsService {
  constructor(private readonly repository: RequestRepository) {}
  create(createRequestDto: CreateRequestDto) {
    return this.repository.create(createRequestDto);
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  update(id: number, updateRequestDto: UpdateRequestDto) {
    return this.repository.update(id, updateRequestDto);
  }

  remove(id: number) {
    return this.repository.remove(id);
  }
}
