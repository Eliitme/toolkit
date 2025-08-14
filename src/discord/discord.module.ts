import { Module } from '@nestjs/common';
import { NecordModule } from 'necord';
import { DiscrodEvent } from './discord.event';
import { ConfigService } from '@nestjs/config';
import { ActivityType, IntentsBitField, Partials } from 'discord.js';

@Module({
  imports: [
    NecordModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        token: configService.get('DISCORD_TOKEN') || '',
        intents: [
          IntentsBitField.Flags.Guilds,
          IntentsBitField.Flags.GuildMessages,
          IntentsBitField.Flags.MessageContent,
          IntentsBitField.Flags.GuildMembers,
          IntentsBitField.Flags.GuildPresences,
          IntentsBitField.Flags.GuildVoiceStates,
        ],
        partials: [
          Partials.Message,
          Partials.User,
          Partials.GuildMember,
          Partials.Channel,
          Partials.Reaction,
          Partials.GuildScheduledEvent,
          Partials.ThreadMember,
          Partials.SoundboardSound,
        ],
        presence: {
          status: 'online',
          activities: [
            {
              type: ActivityType.Streaming,
              name: 'with the bot',
              url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            },
          ],
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [DiscrodEvent],
})
export class DiscordModule {}
