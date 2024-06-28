import { Schema } from 'convict';

export interface DatabaseConfigSchemaInterface {
  database: {
    host: string;
    port: number;
    username: string;
    password: string;
    name: string;
  };
}

export const DatabaseConfigSchema: Schema<DatabaseConfigSchemaInterface> = {
  database: {
    host: {
      doc: 'Database connection host',
      format: '*',
      default: 'localhost',
      env: 'DATABASE_HOST',
      arg: 'database-host',
    },
    port: {
      doc: 'Database connection port',
      format: 'port',
      default: 5432,
      env: 'DATABASE_PORT',
      arg: 'database-port',
    },
    username: {
      doc: 'Database connection user',
      format: '*',
      default: '',
      env: 'DATABASE_USERNAME',
      arg: 'database-username',
    },
    password: {
      doc: 'Database connection password',
      format: '*',
      default: '',
      env: 'DATABASE_PASSWORD',
      arg: 'database-password',
    },
    name: {
      doc: 'Database name',
      format: '*',
      default: '',
      env: 'DATABASE_NAME',
      arg: 'database-name',
    },
  },
};
