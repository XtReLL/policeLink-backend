// users.repository.ts
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { GameServerEntity } from './entities/gameServer.entity';

@Injectable()
export class GameServerRepository extends Repository<GameServerEntity> {
  constructor(dataSource: DataSource) {
    super(GameServerEntity, dataSource.createEntityManager());
  }
}
