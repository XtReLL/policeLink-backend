import { Schema } from 'convict';

export interface ApplicationConfigSchemaInterface {
  application: {
    name: string;
    requestIdFieldName: string;
    webHost?: string;

    rateLimiter: {
      /**
       * The number of seconds that each request will last in storage
       */
      ttl: number;

      /**
       * The maximum number of requests within the TTL limit
       */
      limit: number;

      throttlerDebugKey: string;
    };
  };
}

export const ApplicationConfigSchema: Schema<ApplicationConfigSchemaInterface> =
  {
    application: {
      name: {
        doc: 'Application name',
        format: '*',
        default: 'newTown-database',
        env: 'APPLICATION_NAME',
      },
      requestIdFieldName: {
        doc: 'Name for header field aimed to contain unique id of request',
        format: '*',
        default: 'x-request-id',
      },
      webHost: {
        doc: 'Web application host',
        format: '*',
        default: undefined,
        env: 'APPLICATION_WEB_HOST',
      },

      rateLimiter: {
        ttl: {
          doc: 'The number of seconds that each request will last in storage',
          default: 10,
          nullable: false,
          env: 'APPLICATION_RATE_LIMITS_TTL',
        },
        limit: {
          doc: 'The maximum number of requests within the TTL limit',
          default: 100,
          nullable: false,
          env: 'APPLICATION_RATE_LIMITS_LIMIT',
        },
        throttlerDebugKey: {
          doc: 'Autotest Key',
          default: 'M-34-0ergkkkEf0e-394-42klnLmD',
          nullable: false,
          env: 'APPLICATION_RATE_LIMITS_KEY',
        },
      },
    },
  };
