import { Schema } from 'convict';

export interface ServerConfigSchemaInterface {
  server: {
    host: string;
    port: number;
  };
}

export const ServerConfigSchema: Schema<ServerConfigSchemaInterface> = {
  server: {
    host: {
      doc: 'Application server host',
      format: '*',
      default: 'localhost',
      env: 'SERVER_HOST',
      arg: 'host',
    },
    port: {
      doc: 'Application server port',
      format: 'port',
      default: 3000,
      env: 'SERVER_PORT',
      arg: 'port',
    },
  },
};
