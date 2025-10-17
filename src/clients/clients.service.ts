import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientRepository } from './repository/client.repository';
import { ClientEntity } from './entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(private readonly repository: ClientRepository) {}
  create(createClientDto: CreateClientDto): Promise<ClientEntity> {
    return this.repository.create(createClientDto);
  }

  findAll(): Promise<ClientEntity[]> {
    return this.repository.findAll();
  }

  findByEmail(email: string): Promise<ClientEntity> {
    return this.repository.findbyEmail(email);
  }

  findOne(id: number): Promise<ClientEntity> {
    return this.repository.findOne(id);
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return this.repository.update(id, updateClientDto);
  }

  remove(id: number) {
    return this.repository.remove(id);
  }
}
