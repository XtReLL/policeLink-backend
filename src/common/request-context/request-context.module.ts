import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@config';
import { RequestContextMiddleware } from './request-context.middleware';

@Module({
  imports: [ConfigModule],
  providers: [RequestContextMiddleware],
  exports: [RequestContextMiddleware],
})
export class RequestContextModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(RequestContextMiddleware).forRoutes('*');
  }
}
