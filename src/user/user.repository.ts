// users.repository.ts
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async createUser(user: Partial<UserEntity>): Promise<UserEntity> {
    try {
      return this.save(user);
    } catch (error) {}
  }
}
