import { Injectable } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { RequestRepository } from './repository/requests.repository';

@Injectable()
export class RequestsService {
  constructor(private readonly repository: RequestRepository) {}
  create(createRequestDto: CreateRequestDto) {
    return this.repository.create(createRequestDto);
  }

  findAll() {
    return this.repository.findAll();
  }

  async findAllPaginated(page: number, limit: number, clientId?: number) {
    return this.repository.findAllPaginated(page, limit, clientId);
  }
  async findById(page: number, limit: number, clientId?: number) {
    return this.repository.findAllPaginated(page, limit, clientId);
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
  removeCurrent(id: number) {
    return this.repository.remove(id);
  }
}
