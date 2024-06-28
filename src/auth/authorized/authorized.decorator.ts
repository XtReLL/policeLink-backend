import { Request } from 'express';
import { getManager } from 'typeorm';
import { DateTime } from 'luxon';
import { ForbiddenError } from '@nestjs/apollo';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { getServerKeyFromUrl } from '@common/util';
import { AuthorizedFactory } from './authorized.factory';
import { AuthorizedModel } from './authorized.model';
import { UserEntity } from '@src/user/entities/user.entity';
import { GameServerEntity } from '@src/game-server/entities/gameServer.entity';

export const getGameServer = async (
  data: any,
  context: ExecutionContext,
): Promise<AuthorizedModel> => {
  const ctx = GqlExecutionContext.create(context);

  const req = ctx.getContext().req as Request & {
    gameServer?: AuthorizedModel;
  } & {
    user?: UserEntity;
  };

  if (req.gameServer) {
    return req.gameServer;
  }

  const origin = req.header('origin') || '';
  const serverKey =
    req.header('serverKey') ||
    (origin.search(/domain\.(dev|io)/) > 0
      ? getServerKeyFromUrl(origin)
      : undefined);

  if (!serverKey) {
    throw new ForbiddenError(`server Key does not exist`);
  }

  const model = await getManager()
    .getRepository(GameServerEntity)
    .findOne({ where: { key: serverKey } });

  if (!model) {
    throw new ForbiddenError(`can't find game server`);
  }

  const localDate = DateTime.local().setZone(model.timezone).toJSDate();

  const res = AuthorizedFactory(model, localDate, req.user);
  req.gameServer = res;

  return res;
};

export const Authorized = createParamDecorator(getGameServer);
