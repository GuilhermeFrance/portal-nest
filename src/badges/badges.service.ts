import { Injectable } from '@nestjs/common';
import { CreateBadgeDto } from './dto/create-badge.dto';
import { UpdateBadgeDto } from './dto/update-badge.dto';
import { BadgesRepository } from './repository/badges.repository';

@Injectable()
export class BadgesService {
  constructor(private readonly repository: BadgesRepository) {}
  create(createBadgeDto: CreateBadgeDto) {
    return this.repository.create(createBadgeDto);
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  update(id: number, updateBadgeDto: UpdateBadgeDto) {
    return this.repository.update(id, updateBadgeDto);
  }

  remove(id: number) {
    return this.repository.remove(id);
  }
}
