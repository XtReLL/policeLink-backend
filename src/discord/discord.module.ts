import { Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { DiscordResolver } from './discord.resolver';
import { DiscordClient } from './discord.client';

@Module({
  providers: [DiscordService, DiscordResolver, DiscordClient],
  exports: [DiscordClient],
})
export class DiscordModule {}
