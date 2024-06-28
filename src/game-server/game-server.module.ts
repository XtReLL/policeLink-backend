import { Module } from '@nestjs/common';
import { GameServerService } from './game-server.service';
import { GameServerResolver } from './game-server.resolver';
import { GameServerRepository } from './game-server.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameServerEntity } from './entities/gameServer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GameServerEntity])],
  providers: [GameServerService, GameServerResolver, GameServerRepository],
})
export class GameServerModule {}
