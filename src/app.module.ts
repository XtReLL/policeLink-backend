import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { ApolloPlugins } from '@plugins';
import { AppResolver } from './app.resolver';
import { GraphqlModule } from './graphql';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GameServerModule } from './game-server/game-server.module';
import { DiscordModule } from './discord/discord.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule,
    GraphqlModule,
    UserModule,
    AuthModule,
    GameServerModule,
    DiscordModule,
  ],
  controllers: [],
  providers: [ConfigService, ...ApolloPlugins, AppResolver],
})
export class AppModule {}
