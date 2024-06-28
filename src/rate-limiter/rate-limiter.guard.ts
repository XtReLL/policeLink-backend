import { ErrorConst } from '@interfaces/errors.interface';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import {
  ThrottlerGuard,
  ThrottlerModuleOptions,
  ThrottlerOptions,
  ThrottlerStorage,
} from '@nestjs/throttler';
import { ConfigService } from '@src/config/config.service';

@Injectable()
export class RateLimiterGuard extends ThrottlerGuard {
  protected errorMessage: string;
  protected throttlerKey: string;
  constructor(
    options: ThrottlerModuleOptions,
    storageService: ThrottlerStorage,
    reflector: Reflector,
    private readonly configService: ConfigService,
  ) {
    super(options, storageService, reflector);
    const { application } = this.configService.get();
    this.throttlerKey = application.rateLimiter.throttlerDebugKey;
  }
  getRequestResponse(context: ExecutionContext) {
    const gqlCtx = GqlExecutionContext.create(context);
    const ctx = gqlCtx.getContext();

    if (ctx.req) {
      return { req: ctx.req, res: ctx.req.res };
    }
  }

  // protected async handleRequest(
  //   context: ExecutionContext,
  //   limit: number,
  //   ttl: number,
  //   throttler: ThrottlerOptions,
  // ): Promise<boolean> {
  //   const gqlCtx = GqlExecutionContext.create(context);
  //   const ctx = gqlCtx.getContext();
  //   if (ctx.req.headers['throttlerkey'] === this.throttlerKey) {
  //     return true;
  //   }
  //   this.errorMessage = ErrorConst.networkQuiresLimit;
  //   return super.handleRequest(context, limit, ttl, throttler);
  // }
}
