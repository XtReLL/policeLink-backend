import { GameServerEntity } from '@src/game-server/entities/gameServer.entity';
import { UserEntity } from '@src/user/entities/user.entity';

export interface AuthorizedModel {
  model: GameServerEntity;
  localDate: Date;
  user?: UserEntity;
}
