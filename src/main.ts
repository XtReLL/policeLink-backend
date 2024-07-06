import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ApplicationEnvironment } from '@interfaces/application.interface';

import { Logger, RequestMethod } from '@nestjs/common';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  const configService: ConfigService = app.get(ConfigService);
  const { server, application, env, graphql, rest } = configService.get();
  const isProd = env === ApplicationEnvironment.PRODUCTION;

  if (isProd) {
    app.enable('trust proxy');
  }

  app.enableCors({
    origin: '*',
    methods: 'GET,POST,OPTIONS',
  });

  app.setGlobalPrefix(rest.endpoint, {
    exclude: [{ path: graphql.endpoint, method: RequestMethod.POST }],
  });

  await app.listen(server.port, server.host, async () => {
    Logger.log(`Api launched at ${await app.getUrl()}`, application.name);
  });
}
bootstrap();
