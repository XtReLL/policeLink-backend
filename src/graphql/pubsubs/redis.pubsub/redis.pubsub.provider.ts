import { Injectable, Logger } from '@nestjs/common';
import Redis, { RedisOptions } from 'ioredis';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { ConfigService } from '@config';

@Injectable()
export class RedisPubsubProvider {
  private readonly logger: Logger = new Logger(RedisPubsubProvider.name);
  readonly pubsub: RedisPubSub;

  constructor(private readonly configService: ConfigService) {
    const { redis } = this.configService.get().connections;
    const connectionOptions: RedisOptions = {
      host: redis.host,
      port: redis.port,
      username: redis.user,
      password: redis.password,
      db: redis.databases.pubsub,
    };

    this.logger.log(
      `Redis connection options for graphql pubsub: ${JSON.stringify(
        connectionOptions,
      )}`,
    );

    this.pubsub = new RedisPubSub({
      publisher: new Redis(connectionOptions),
      subscriber: new Redis(connectionOptions),
    });
  }
}
