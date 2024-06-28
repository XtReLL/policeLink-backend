import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as Convict from 'convict';
import * as dotenv from 'dotenv';
import * as path from 'path';

import { ConfigSchema, ConfigSchemaInterface } from './config.schema';

@Injectable()
export class ConfigService {
  private config: Convict.Config<ConfigSchemaInterface>;

  constructor() {
    const config = Convict(ConfigSchema);
    const { env } = config.getProperties();

    this.loadEnv();
    config.loadFile(path.resolve(`config/${env}.config.json`));
    config.validate({ allowed: 'strict' });

    this.config = config;
  }

  public get() {
    return this.config.getProperties();
  }

  public getDatabaseOptions(): TypeOrmModuleOptions {
    const { database } = this.get();

    return {
      type: 'postgres',
      host: database.host,
      port: database.port,
      username: database.username,
      password: database.password,
      database: database.name,
      // migrations: [`${__dirname}/../database/migrations/*{.ts,.js}`],
      entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
      // subscribers: [`${__dirname}/../**/*.subscriber{.ts,.js}`],
      synchronize: true,
      migrationsRun: true,
    };
  }

  private loadEnv() {
    dotenv.config();
  }
}
