import { AuthenticationError } from '@nestjs/apollo';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { UserEntity } from '@src/user/entities/user.entity';
import { GameServerRepository } from '@src/game-server/game-server.repository';
import { AuthorizedModel } from './authorized/authorized.model';
import { LoginWorkflowType } from '@src/game-server/interfaces/gameServer.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(AuthService) private readonly authService: AuthService,
    @Inject(GameServerRepository)
    private readonly gameServerRepository: GameServerRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);

    const req = ctx.getContext().req as Request & { user?: UserEntity } & {
      gameServer?: AuthorizedModel;
    };

    let gameServer = req.gameServer.model;
    if (!gameServer) {
      gameServer = await this.gameServerRepository.findOneOrFail({
        where: { key: req.header('serverKey') },
      });
    }
    if (gameServer.loginWorkflow === LoginWorkflowType.AllowAnonymous) {
      return true;
    }

    const bearerToken = req.header('Authorization');

    if (bearerToken) {
      const bearerParts = bearerToken.split(' ');

      if (bearerParts.length === 2) {
        const bearer = bearerParts[0];
        const token = bearerParts[1];
        if (bearer !== 'Bearer' || !token) {
          throw new AuthenticationError(`user not authorized`);
        }

        const user = await this.authService.authenticate(token);
        req.user = user;

        return true;
      }
    }

    return false;
  }
}
