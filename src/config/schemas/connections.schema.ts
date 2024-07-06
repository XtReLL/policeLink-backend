import { Schema } from 'convict';

export interface ConnectionsConfigSchemaInterface {
  connections: {
    redis: {
      host: string;
      port: number;
      user?: string;
      password?: string;
      databases: {
        pubsub: number;
        queues: number;
      };
    };
    discord: {
      host: string;
      protocol: 'http' | 'https';
      DISCORD_REDIRECT_URI: string;
      DISCORD_CLIENT_ID: string;
      DISCORD_CLIENT_SECRET: string;
    };
  };
}

export const ConnectionsConfigSchema: Schema<ConnectionsConfigSchemaInterface> =
  {
    connections: {
      redis: {
        host: {
          doc: 'Redis host',
          default: 'localhost',
          env: 'REDIS_HOST',
        },
        port: {
          doc: 'Redis port',
          default: 6379,
          env: 'REDIS_PORT',
        },
        user: {
          doc: 'Redis user',
          default: '',
          env: 'REDIS_USER',
        },
        password: {
          doc: 'Redis user password',
          default: '',
          env: 'REDIS_PASSWORD',
        },
        databases: {
          pubsub: {
            doc: 'Redis "pubsub" namespace',
            default: 1,
            env: 'REDIS_NS_PUBSUB',
          },
          queues: {
            doc: 'Redis "queues" namespace',
            default: 2,
            env: 'REDIS_NS_QUEUES',
          },
        },
      },
      discord: {
        host: {
          doc: 'Discord Api host',
          format: '*',
          default: 'discord.com/api/v10',
          env: 'CONNECTIONS_DISCORD_HOST',
        },
        protocol: {
          doc: 'Discord Api protocol',
          format: '*',
          default: 'https',
          env: 'CONNECTIONS_DISCORD_PROTOCOL',
        },
        DISCORD_REDIRECT_URI: {
          doc: 'Discord client redirect uri',
          format: '*',
          default: '',
          env: 'CLIENT_REDIRECT_URI',
        },
        DISCORD_CLIENT_ID: {
          doc: 'Discord client id',
          format: '*',
          default: '',
          env: 'DISCORD_CLIENT_ID',
        },
        DISCORD_CLIENT_SECRET: {
          doc: 'Discord client secret',
          format: '*',
          default: '',
          env: 'DISCORD_CLIENT_SECRET',
        },
      },
    },
  };
