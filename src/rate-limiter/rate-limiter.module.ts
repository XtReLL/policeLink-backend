import { ConfigModule, ConfigService } from '@config';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { RateLimiterGuard } from './rate-limiter.guard';

@Module({
  imports: [
    ConfigModule,
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService, ...args: any[]) => {
        const { application } = configService.get();
        const { ttl, limit } = application.rateLimiter;

        return {
          ...args,
          throttlers: [{ ttl, limit }],
        };
      },
    }),
  ],

  providers: [
    {
      provide: APP_GUARD,
      useClass: RateLimiterGuard,
    },
  ],
})
export class RateLimiterModule {}
