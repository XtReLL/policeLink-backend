import * as safeJsonStringify from 'safe-json-stringify';
import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule, ConfigService } from '@config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const options = configService.getDatabaseOptions();
        Logger.log(
          `Database connection options: ${safeJsonStringify(options)}`,
          'Database',
        );

        return {
          ...options,
          // logging: true
        };
      },

      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
