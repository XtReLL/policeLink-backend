import { UserEntity } from '@src/user/entities/user.entity';
import { AuthorizedModel } from './authorized.model';
import { GameServerEntity } from '@src/game-server/entities/gameServer.entity';

export const AuthorizedFactory = (
  model: GameServerEntity,
  localDate?: Date,
  user?: UserEntity,
): AuthorizedModel => ({
  model,
  localDate,
  user,
});
