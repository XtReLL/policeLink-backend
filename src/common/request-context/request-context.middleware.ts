import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { uuid } from 'short-uuid';
import { ConfigService } from '@config';
import { RequestContextStorage } from './request-context.storage';

@Injectable()
export class RequestContextMiddleware
  implements NestMiddleware<Request, Response>
{
  constructor(private readonly configService: ConfigService) {}

  use(req: Request, res: Response, next: () => void) {
    const { name } = this.configService.get().application;
    const requestId = uuid();
    const serverKey = req.header('serverKey');

    RequestContextStorage.cls.run(
      new RequestContextStorage({
        app: name,
        requestId,
        serverKey,
        request: req,
        response: res,
      }),
      next,
    );
  }
}
