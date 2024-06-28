import { Module } from '@nestjs/common';

import { ConfigModule } from '@config';
import { RedisPubsubProvider } from './redis.pubsub.provider';

@Module({
  imports: [ConfigModule],
  providers: [RedisPubsubProvider],
  exports: [RedisPubsubProvider],
})
export class RedisPubsubModule {}
