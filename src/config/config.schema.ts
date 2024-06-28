import { Schema } from 'convict';

import { ApplicationEnvironment } from '@common/interfaces/application.interface';

import {
  ApplicationConfigSchema,
  ApplicationConfigSchemaInterface,
} from './schemas/application.schema';
import {
  ServerConfigSchema,
  ServerConfigSchemaInterface,
} from './schemas/server.schema';
import {
  DatabaseConfigSchema,
  DatabaseConfigSchemaInterface,
} from './schemas/database.schema';
import {
  GraphQLConfigSchema,
  GraphQLConfigSchemaInterface,
} from './schemas/graphql.schema';
import {
  ConnectionsConfigSchema,
  ConnectionsConfigSchemaInterface,
} from './schemas/connections.schema';
import {
  SecurityConfigSchema,
  SecurityConfigSchemaInterface,
} from './schemas/security.schema';

export interface ConfigSchemaInterface
  extends ApplicationConfigSchemaInterface,
    ServerConfigSchemaInterface,
    DatabaseConfigSchemaInterface,
    GraphQLConfigSchemaInterface,
    ConnectionsConfigSchemaInterface,
    SecurityConfigSchemaInterface {
  env: ApplicationEnvironment;
}

export const ConfigSchema: Schema<ConfigSchemaInterface> = {
  env: {
    doc: 'Application environment',
    format: Object.values(ApplicationEnvironment),
    default: ApplicationEnvironment.LOCAL,
    env: 'NODE_ENV',
    arg: 'env',
  },

  ...ApplicationConfigSchema,
  ...ServerConfigSchema,
  ...DatabaseConfigSchema,
  ...GraphQLConfigSchema,
  ...ConnectionsConfigSchema,
  ...SecurityConfigSchema,
};
