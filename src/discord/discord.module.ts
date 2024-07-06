import { Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { DiscordResolver } from './discord.resolver';
import { DiscordClient } from './discord.client';
import { ConfigModule } from '@config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [DiscordService, DiscordResolver, DiscordClient],
  exports: [DiscordClient],
})
export class DiscordModule {}
